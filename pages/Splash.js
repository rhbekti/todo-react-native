import { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem("email").then((value) => {
        value === null
          ? navigation.replace("Login")
          : navigation.replace("Home");
      });
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2ecc71",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 28 }}>
        ToDo List App
      </Text>
    </View>
  );
};

export default Splash;
