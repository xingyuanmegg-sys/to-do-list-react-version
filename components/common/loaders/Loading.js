import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const Loading = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingCard}>
        <ActivityIndicator
          size="large"
          color="#1976D2"
          style={styles.spinner}
        />
        <Text style={styles.message}>{message || "Loading your tasks..."}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  loadingCard: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    minWidth: "80%",
    justifyContent: "center",
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#1976D2",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Loading;
