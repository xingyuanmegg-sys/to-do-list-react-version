// import { useEffect, useState } from "react";
// import getTodos from "../utils/my-api";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "./common/Loading";
// import ErrorMessage from "./common/ErrorMessage";
// import { FlatList, StyleSheet, Text, View } from "react-native";
// import TaskList from "./tasks/TaskList";

// export default function TasksStats() {
//   return (
//     <View style={styles.statsContainer}>
//       <Text style={styles.taskCount}>
//         Total: {tasklist.todos.length}{" "}
//         {tasklist.todos.length === 1 ? "task" : "tasks"}
//       </Text>
//       <Text style={styles.completedCount}>
//         Completed: {tasklist.todos.filter((task) => task.completed).length}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   taskCount: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1976D2",
//   },
//   completedCount: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#2E7D32",
//   },
// });
