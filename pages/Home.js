import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const login = ({ navigation }) => {
      useEffect(() => {
        setTimeout(() => {
          AsyncStorage.getItem("email").then((value) => {
            value === null
              ? navigation.replace("Login")
              : navigation.replace("Home");
          });
        }, 3000);
      }, []);
    };
    axios
      .get("https://tetrarchic-hyphen.000webhostapp.com/get_list.php")
      .then((response) => {
        const todos = response.data.data;
        this.setState({ todos });
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
          "Gagal Mendapakan Data",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  }
  componentDidUpdate() {
    axios
      .get("https://tetrarchic-hyphen.000webhostapp.com/get_list.php")
      .then((response) => {
        const todos = response.data.data;
        this.setState({ todos });
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
          "Gagal Mendapakan Data",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  }

  logout = () => {
    Alert.alert(
      "Konfirmasi",
      "Apakah ingin keluar?",
      [
        {
          text: "Ya",
          onPress: () => {
            AsyncStorage.clear;
            this.props.navigation.navigate("Login");
          },
        },
        {
          text: "Batal",
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  detail = (item) => {
    this.props.navigation.navigate("Edit", { item: item });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Todo List</Text>
        <View style={styles.action}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => this.props.navigation.navigate("Add")}
          >
            <Text style={styles.txtAdd}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={this.logout}>
            <Text style={styles.txtAdd}>Logout</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.todos.map((item, index) => {
            return (
              <View key={index} style={styles.list}>
                <TouchableOpacity onPress={() => this.detail(item)}>
                  <Text style={styles.title}>{item.judul}</Text>
                  <Text style={styles.deskripsi}>{item.deskripsi}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginVertical: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  list: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 3,
  },
  deskripsi: {
    fontWeight: "400",
    fontSize: 16,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnAdd: {
    width: 100,
    padding: 10,
    backgroundColor: "#2980b9",
    borderRadius: 14,
  },
  btnLogout: {
    width: 100,
    padding: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 14,
  },
  txtAdd: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;
