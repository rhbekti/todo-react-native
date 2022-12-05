import { Component, useEffect } from "react";
import {
  Keyboard,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
    };
    AsyncStorage.clear();
  }

  handlerBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handlerBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handlerBackPress);
  }

  login = () => {
    const { userEmail, userPassword } = this.state;
    let error = 0;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userEmail == "") {
      this.setState({ email: "Email harus diisi" });
      error = 1;
    } else if (reg.test(userEmail) == false) {
      this.setState({ email: "Format email tidak sesuai" });
      error = 1;
    } else {
      this.setState({ email: "" });
      error = 0;
    }

    if (userPassword == "") {
      this.setState({ password: "Password harus diisi" });
      error = 1;
    } else {
      this.setState({ password: "" });
      error = 0;
    }

    if (error == 0) {
      // request to server
      const url = "https://donasibaznaskebumen.com/login.php";

      try {
        fetch(url, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == true) {
              ToastAndroid.showWithGravityAndOffset(
                responseJson.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );

              AsyncStorage.setItem("email", userEmail);
              AsyncStorage.setItem("password", userPassword);

              this.props.navigation.navigate("Home");
            } else {
              Alert.alert("", responseJson.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    Keyboard.dismiss();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Silakan login untuk melanjutkan</Text>

        <TextInput
          placeholder="Masukkan Email"
          style={styles.input}
          onChangeText={(userEmail) => this.setState({ userEmail })}
          keyboardType="email-address"
          secureTextEntry={false}
          value={this.state.userEmail}
        ></TextInput>

        <Text style={styles.message}>{this.state.email}</Text>

        <TextInput
          placeholder="Masukkan Password"
          style={styles.input}
          onChangeText={(userPassword) => this.setState({ userPassword })}
          secureTextEntry={true}
          value={this.state.userPassword}
        ></TextInput>

        <Text style={styles.message}>{this.state.password}</Text>

        <TouchableOpacity style={styles.btnLogin} onPress={this.login}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 2,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 14,
    marginVertical: 2,
  },
  message: {
    color: "#e74c3c",
    fontSize: 12,
  },
  btnLogin: {
    marginTop: 13,
    backgroundColor: "#2980b9",
    padding: 10,
    borderRadius: 14,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Login;
