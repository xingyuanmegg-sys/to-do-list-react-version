import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Checkbox from "expo-checkbox";
const TaskItem = (props) => {
  const handleLongPress = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          props.deleteTask(props.id);
        },
      },
    ]);
  };
  const handlePress = () => {
    props.handlePress(props.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.taskItemContainer,
        props.completed && styles.completedTask,
      ]}
      onLongPress={handleLongPress}
      onPress={handlePress}
    >
      <View style={styles.taskItemInfo}>
        <Text
          style={[styles.taskItemName, props.completed && styles.completedText]}
        >
          {props.todo}
        </Text>
        {props.dueDate && (
          <Text style={styles.taskItemDueDate}>Due: {props.dueDate}</Text>
        )}
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={props.completed}
          onValueChange={() => props.toggleChecked(props.id)}
          color={props.completed ? "#2E7D32" : "#1976D2"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItemContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedTask: {
    backgroundColor: "#F8F9FA",
    opacity: 0.9,
  },
  taskItemInfo: {
    flex: 1,
    marginRight: 15,
  },
  taskItemName: {
    fontSize: 16,
    color: "#212121",
    fontWeight: "500",
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9E9E9E",
  },
  taskItemDueDate: {
    fontSize: 12,
    color: "#757575",
    fontStyle: "italic",
  },
  checkboxContainer: {
    padding: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#BDBDBD",
  },
});

export default TaskItem;
