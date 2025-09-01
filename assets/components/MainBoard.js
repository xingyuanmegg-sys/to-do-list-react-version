import { useEffect, useState } from "react";
import getTodos from "../utils/my-api";
import { useQuery } from "@tanstack/react-query";
import Loading from "./common/Loading";
import ErrorMessage from "./common/ErrorMessage";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskList from "./tasks/TaskList";
import AddTaskButton from "./buttons/AddTaskButton";
import AddTaskModal from "./AddTaskModal";

export default function MainBoard() {
  const {
    isLoading,
    error,
    data: tasklist,
  } = useQuery({
    queryKey: ["todolistData"],
    queryFn: async () => {
      const res = await getTodos();
      return res.data;
    },
  });

  if (isLoading) return <Loading message="Loading your tasks ..."></Loading>;
  if (error)
    return (
      <ErrorMessage
        title="Network Error!"
        message="Unable to load your tasks. Please check your internet connection."
      ></ErrorMessage>
    );
  return (
    <View style={styles.mainBoard}>
      <TaskList tasks={tasklist.todos} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainBoard: {
    flex: 1,
    padding: 0,
    width: "90%",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskCount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1976D2",
  },
  completedCount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2E7D32",
  },
});
