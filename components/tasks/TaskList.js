import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import TaskItem from "./TaskItem";
import AddTaskButton from "../buttons/AddTaskButton";
import AddTaskModal from "../AddTaskModal";
import UpdateTaskModal from "../UpdateTaskModal";
import * as Notifications from "expo-notifications";
import { isBefore } from "date-fns";

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
    // 监听收到的通知
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // 当收到通知时显示弹窗
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
      console.log(taskToEdit);
    },
    [tasksList]
  );

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
    [toggleChecked, deleteTask, setUpdateTaskModal]
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasksList}
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
