import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import TaskItem from "./TaskItem";
import AddTaskButton from "../common/buttons/AddTaskButton";
import AddTaskModal from "../common/modals/AddTaskModal";
import UpdateTaskModal from "../common/modals/UpdateTaskModal";
import * as Notifications from "expo-notifications";
import { isBefore } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function TaskList(props) {
  const [tasksList, setTasksList] = useState(props.tasks);

  //notification handler
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert(
          notification.request.content.title,
          notification.request.content.body,
          [{ text: "OK" }]
        );
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const tasksNotDone = tasksList.filter(
      (task) =>
        !task.completed && (!task.dueDate || isBefore(task.dueDate, new Date()))
    );

    if (tasksNotDone.length > 0) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Upcoming Tasks 🗓️ ~",
          body: `You still have ${tasksNotDone.length} ${
            tasksNotDone.length > 1 ? "tasks" : "task"
          } not finished yet. Please remember to check~`,
        },
        trigger: null,
      });
    }
  }, []);

  //mark/unmark to dos
  const toggleChecked = useCallback(
    (id) => {
      setTasksList((tasksList) =>
        tasksList.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [tasksList]
  );

  const formatDate = useCallback((date) => {
    if (!date) return;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  //add task
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const showAddTaskModal = useCallback(() => {
    setAddTaskModalVisible(true);
  }, []);
  const setAddTaskModalInvisible = useCallback(() => {
    setAddTaskModalVisible(false);
  }, []);
  const addNewTask = useCallback(
    (name, dueDate = null) => {
      const newTask = {
        id: Date.now().toString(),
        todo: name,
        dueDate,
        formattedDueDate: formatDate(dueDate),
        completed: false,
      };
      setTasksList((tasksList) => [newTask, ...tasksList]);
    },
    [tasksList]
  );

  //delete task
  const deleteTask = useCallback(
    (id) => {
      setTasksList((tasksList) => tasksList.filter((item) => item.id !== id));
    },
    [tasksList]
  );
  const deleteAllCompleteTasks = useCallback(() => {
    Alert.alert(
      "Delete All Completed Tasks",
      "Are you sure you want to delete all completed tasks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTasksList((prevTasks) =>
              prevTasks.filter((task) => !task.completed)
            );
          },
        },
      ]
    );
  }, [tasksList]);

  //update task
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const setUpdateModalInvisible = useCallback(() => {
    setUpdateModalVisible(false);
  }, []);

  const updateTask = useCallback(
    (info) => {
      setTasksList(
        tasksList.map((task) =>
          task.id == info.id
            ? {
                ...task,
                todo: info.name,
                dueDate: info.dueDate,
                formattedDueDate: formatDate(info.dueDate),
              }
            : task
        )
      );
    },
    [tasksList]
  );
  const setUpdateTaskModal = useCallback(
    (id) => {
      setTaskToEdit(tasksList.find((task) => task.id == id));
      setUpdateModalVisible(true);
      //console.log(taskToEdit);
    },
    [tasksList]
  );

  //sort
  const [sortByDate, setSortByDate] = useState(false);
  const sortedTasks = useCallback(() => {
    if (!sortByDate) return tasksList;

    const tasksWithDate = tasksList.filter((task) => task.dueDate);
    const tasksWithoutDate = tasksList.filter((task) => !task.dueDate);

    const sortedWithDate = tasksWithDate.sort((a, b) => {
      const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateCompare !== 0) return dateCompare;

      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return 0;
    });

    return [...sortedWithDate, ...tasksWithoutDate];
  }, [tasksList, sortByDate]);

  const renderTaskItem = useCallback(
    ({ item }) => {
      return (
        <TaskItem
          todo={item.todo}
          completed={item.completed}
          dueDate={item.formattedDueDate}
          id={item.id}
          toggleChecked={toggleChecked}
          deleteTask={deleteTask}
          handlePress={setUpdateTaskModal}
        ></TaskItem>
      );
    },
    [
      toggleChecked,
      deleteTask,
      setUpdateTaskModal,
      deleteAllCompleteTasks,
      sortedTasks,
    ]
  );

  return (
    <View style={styles.listContainer}>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={deleteAllCompleteTasks}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Delete Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, sortByDate && styles.activeButton]}
          onPress={() => setSortByDate((prev) => !prev)}
        >
          <Ionicons
            name={sortByDate ? "calendar" : "calendar-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.actionButtonText}>
            {sortByDate ? "Sorted" : "Sort by Date"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTasks()}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tasks yet. Add a new task to get started!
            </Text>
          </View>
        )}
        //optim
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        initialNumToRender={10}
      />
      <AddTaskModal
        isVisible={addTaskModalVisible}
        setAddTaskModalInvisible={setAddTaskModalInvisible}
        onAddTask={addNewTask}
      ></AddTaskModal>
      <UpdateTaskModal
        isVisible={updateModalVisible}
        setUpdateModalInvisible={setUpdateModalInvisible}
        task={taskToEdit}
        onUpdateTask={updateTask}
      ></UpdateTaskModal>
      <AddTaskButton onPress={showAddTaskModal}></AddTaskButton>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  activeButton: {
    backgroundColor: "#2c3e50",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9E9E9E",
    textAlign: "center",
    fontStyle: "italic",
  },
});
