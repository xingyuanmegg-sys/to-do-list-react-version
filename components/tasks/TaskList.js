import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import TaskItem from "./TaskItem";
import TasksStats from "./TasksStats";
import AddTaskButton from "../buttons/AddTaskButton";
import AddTaskModal from "../AddTaskModal";
import UpdateTaskModal from "../UpdateTaskModal";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import { isAfter, isBefore } from "date-fns";

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
  //notification permission

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
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    }
  }, []);

  //mark/unmark to dos
  const toggleChecked = (id) => {
    setTasksList((tasksList) =>
      tasksList.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, dueDate: null }
          : { ...task, dueDate: null }
      )
    );
  };
  const formatDate = (date) => {
    if (!date) return;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  //add task
  const addNewTask = (name, dueDate = null) => {
    const newTask = {
      id: Date.now(),
      todo: name,
      dueDate,
      completed: false,
    };
    setTasksList((tasksList) => [...tasksList, newTask]);
  };
  //delete task
  const deleteTask = (id) => {
    setTasksList((tasksList) => tasksList.filter((item) => item.id !== id));
  };
  //update task
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const getUpdateTaskModal = (id) => {
    setUpdateModalVisible(true);
    setTaskToEdit(tasksList.find((task) => task.id == id));
  };
  const setUpdateModalInvisible = () => {
    setUpdateModalVisible(false);
  };
  const updateTask = (info) => {
    setTasksList(
      tasksList.map((task) =>
        task.id == info.id
          ? { ...task, todo: info.name, dueDate: info.dueDate }
          : task
      )
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasksList}
        renderItem={({ item }) => (
          <TaskItem
            todo={item.todo}
            completed={item.completed}
            dueDate={formatDate(item.dueDate)}
            id={item.id}
            toggleChecked={() => toggleChecked(item.id)}
            deleteTask={() => deleteTask(item.id)}
            handlePress={(id) => getUpdateTaskModal(id)}
          ></TaskItem>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tasks yet. Add a new task to get started!
            </Text>
          </View>
        )}
      />
      <AddTaskModal
        onAddTask={(name, dueDate) => addNewTask(name, dueDate)}
      ></AddTaskModal>
      <UpdateTaskModal
        isVisible={updateModalVisible}
        setUpdateModalInvisible={setUpdateModalInvisible}
        task={taskToEdit}
        onUpdateTask={(info) => {
          updateTask(info);
        }}
      ></UpdateTaskModal>
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
