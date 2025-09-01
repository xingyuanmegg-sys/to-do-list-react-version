import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskItem from "./TaskItem";
import TasksStats from "./TasksStats";
import AddTaskButton from "../buttons/AddTaskButton";
import AddTaskModal from "../AddTaskModal";
export default function TaskList(props) {
  //mark/unmark to dos
  const [tasksList, setTasksList] = useState(props.tasks);
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

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasksList}
        renderItem={({ item }) => (
          <TaskItem
            todo={item.todo}
            completed={item.completed}
            dueDate={formatDate(item.dueDate)}
            toggleChecked={() => toggleChecked(item.id)}
            deleteTask={() => deleteTask(item.id)}
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
