import getTodos from "../utils/my-api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/loaders/Loading";
import ErrorMessage from "../components/common/errors/ErrorMessage";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import TaskList from "../components/tasks/TaskList";

export default function MainBoard() {
  const {
    isLoading,
    error,
    data: tasklist,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["todolistData"],
    queryFn: async () => {
      const res = await getTodos();
      return res.data;
    },
  });
  const handleReload = () => {
    refetch();
  };

  if (isLoading) return <Loading message="Loading your tasks ..."></Loading>;
  if (error)
    return (
      <View style={styles.errorContainer}>
        <ErrorMessage
          title="Network Error!"
          message="Unable to load your tasks. Please check your internet connection."
        ></ErrorMessage>
        <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.reloadButtonText}>RELOAD</Text>
          </View>
        </TouchableOpacity>
      </View>
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

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  reloadButton: {
    backgroundColor: "#4CAF50", // 绿色背景
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3, // Android阴影
    shadowColor: "#000", // iOS阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  reloadButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
