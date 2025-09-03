import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./components/Header";
import MainBoard from "./components/MainBoard";

const queryClient = new QueryClient();
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header></Header>
      <QueryClientProvider client={queryClient}>
        <MainBoard></MainBoard>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

//style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    padding: 15,
    width: "100%",
    height: "100",
    backgroundColor: "skyblue",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
});
