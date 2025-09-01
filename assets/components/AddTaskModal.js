import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AddTaskButton from "./buttons/AddTaskButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTaskModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [show, setShow] = useState(false);
  const [hasDate, setHasDate] = useState(false);

  const onPress = () => {
    setModalVisible(true);
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const toggleDateSelection = () => {
    if (hasDate) {
      setSelectedDate(null);
    } else {
      setSelectedDate(new Date());
    }
    setHasDate(!hasDate);
  };

  const clearDate = () => {
    setSelectedDate(null);
    setHasDate(false);
  };

  const formatDate = (date) => {
    if (!date) return "No date set";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSave = () => {
    if (!taskName.trim()) {
      Alert.alert("Error", "Please enter a task name");
      return;
    }

    const dueDate = hasDate ? selectedDate : null;

    if (props.onAddTask) {
      props.onAddTask(taskName.trim(), dueDate);
    }

    setTaskName("");
    setSelectedDate(null);
    setHasDate(false);
    setModalVisible(false);
  };

  const handleCancel = () => {
    if (taskName.trim() || hasDate) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              setTaskName("");
              setSelectedDate(null);
              setHasDate(false);
              setModalVisible(false);
            },
          },
        ]
      );
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Task</Text>

            {/* Task Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Input Task Name: </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter task name"
                placeholderTextColor="#999"
                value={taskName}
                onChangeText={setTaskName}
                autoFocus={true}
                maxLength={100}
              />
            </View>

            {/* Date Selection Toggle */}
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.toggleContainer}
                onPress={toggleDateSelection}
              >
                <View style={styles.toggleRow}>
                  <Text style={styles.label}>Set due date</Text>
                  <View
                    style={[
                      styles.toggleSwitch,
                      hasDate && styles.toggleSwitchOn,
                    ]}
                  >
                    <View
                      style={[
                        styles.toggleKnob,
                        hasDate && styles.toggleKnobOn,
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Date Picker (only show if hasDate is true) */}
            {hasDate && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Due Date: </Text>
                <View style={styles.dateRow}>
                  <TouchableOpacity
                    style={[
                      styles.datePickerButton,
                      !selectedDate && styles.datePickerButtonEmpty,
                    ]}
                    onPress={showDatepicker}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        !selectedDate && styles.dateTextEmpty,
                      ]}
                    >
                      {formatDate(selectedDate)}
                    </Text>
                  </TouchableOpacity>
                  {selectedDate && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={clearDate}
                    >
                      <Text style={styles.clearButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Date Picker Modal */}
            {show && (
              <DateTimePicker
                testID="datePicker"
                value={selectedDate || new Date()}
                mode="date"
                is24Hour={true}
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.saveButton,
                  !taskName.trim() && styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!taskName.trim()}
              >
                <Text style={styles.saveButtonText}>Save Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <AddTaskButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#2c3e50",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#34495e",
  },
  textInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    color: "#2c3e50",
  },
  toggleContainer: {
    paddingVertical: 8,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ddd",
    padding: 2,
    justifyContent: "center",
  },
  toggleSwitchOn: {
    backgroundColor: "#3498db",
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    transform: [{ translateX: 0 }],
  },
  toggleKnobOn: {
    transform: [{ translateX: 22 }],
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  datePickerButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  datePickerButtonEmpty: {
    borderColor: "#bdc3c7",
    backgroundColor: "#ecf0f1",
  },
  dateText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  dateTextEmpty: {
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e74c3c",
  },
  cancelButtonText: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#3498db",
  },
  saveButtonDisabled: {
    backgroundColor: "#bdc3c7",
    opacity: 0.6,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTaskModal;
