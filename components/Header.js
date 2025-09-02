import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Todo List</Text>
      <Text style={styles.headerSubtitle}>Stay organized and productive</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1976D2",
    textAlign: "center",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default Header;
