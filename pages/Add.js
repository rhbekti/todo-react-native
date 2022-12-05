import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component, useEffect } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Button,
  View,
  ToastAndroid,
  Keyboard,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const apiURL = "https://donasibaznaskebumen.com/add_list.php";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      judul: "",
      deskripsi: "",
    };
  }

  addList = () => {
    const { judul, deskripsi } = this.state;

    if (judul != "" && deskripsi != "") {
      try {
        fetch(apiURL, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            judul: judul,
            deskripsi: deskripsi,
          }),
        })
          .then((respon) => respon.json())
          .then((responJson) => {
            if (responJson.status == true) {
              ToastAndroid.showWithGravityAndOffset(
                responJson.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              this.props.navigation.navigate("Home");
            } else {
              ToastAndroid.showWithGravityAndOffset(
                responJson.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Data form belum lengkap",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    Keyboard.dismiss();
  };

  handlerBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  componentDidMount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handlerBackPress);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <Text style={styles.title}>Tambah Todo List</Text>
          <Text>Judul</Text>
          <TextInput
            style={styles.judul}
            onChangeText={(judul) => this.setState({ judul })}
            value={this.state.judul}
          ></TextInput>
          <Text>Deskripsi</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.desc}
            onChangeText={(deskripsi) => this.setState({ deskripsi })}
            value={this.state.deskripsi}
          ></TextInput>
        </View>
        <Button onPress={this.addList} title="Simpan" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
  },
  judul: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 5,
  },
  desc: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    textAlignVertical: "top",
    marginVertical: 5,
    height: 100,
  },
});

export default Add;
