// import Foundation from "react-native-vector-icons/Foundation";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Touchable,
//   TouchableOpacity,
// } from "react-native";
// export default function ErrorMessage(props) {
//   const errorTitle = props.title || "Error";
//   return (
//     <View style={styles.container}>
//       <View style={styles.error}>
//         <Foundation name="alert" color="#000" size={20} />
//         <Text style={styles.title}>{errorTitle}</Text>
//       </View>

//       <TouchableOpacity style={styles.reload}>
//         <Text style={styles.label}>RELOAD</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     color: "#999",
//   },
//   reload: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     backgroundColor: "#078a60ff",
//     height: 40,
//     borderRadius: 4,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   label: {
//     color: "#fff",
//     lineHeiht: 40,
//   },
//   error: {
//     flexDirection: "row",
//     alignItems: "space-between",
//   },
// });
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ErrorMessage = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.errorCard}>
        <Ionicons
          name="warning"
          size={48}
          color="#D32F2F"
          style={styles.icon}
        />
        <Text style={styles.title}>{title || "Something went wrong"}</Text>
        <Text style={styles.message}>
          {message || "Please check your connection and try again."}
        </Text>
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
  errorCard: {
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
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default ErrorMessage;
