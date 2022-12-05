import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  ToastAndroid,
  View,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
AsyncStorage;

const apiURLUpdate = "https://donasibaznaskebumen.com/update_list.php";
const apiURLDelete = "https://donasibaznaskebumen.com/delete_list.php";

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
  btnEdit: {
    backgroundColor: "#f1c40f",
    borderRadius: 14,
  },
  btnHapus: {
    backgroundColor: "#e74c3c",
    borderRadius: 14,
  },
  txtBtn: {
    paddingVertical: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

const Edit = ({ navigation, route }) => {
  const params = route.params;
  const items = params ? params.item : undefined;

  const [id, setId] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    if (items) {
      setId(items.id);
      setJudul(items.judul);
      setDeskripsi(items.deskripsi);
    }
  }, [items]);

  const updateList = () => {
    if (judul != "") {
      if (deskripsi != "") {
        try {
          fetch(apiURLUpdate, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: id,
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
                navigation.navigate("Home");
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
      }
    }
  };

  const deleteList = () => {
    Alert.alert(
      "Konfirmasi",
      "Data akan dihapus?",
      [
        {
          text: "Batal",
        },
        {
          text: "Hapus",
          onPress: () => {
            axios
              .get(`${apiURLDelete}?id=${id}}`)
              .then((response) => {
                const res = response.data;
                if (res.status == true) {
                  ToastAndroid.showWithGravityAndOffset(
                    res.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                  navigation.navigate("Home");
                } else {
                  ToastAndroid.showWithGravityAndOffset(
                    res.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                }
              })
              .catch((error) => {
                ToastAndroid.showWithGravityAndOffset(
                  "Gagal Menghapus Data",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
              });
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text style={styles.title}>Detail Todo List</Text>
        <Text>Judul</Text>
        <TextInput
          style={styles.judul}
          onChangeText={(judul) => setJudul(judul)}
          value={judul}
        ></TextInput>
        <Text>Deskripsi</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.desc}
          onChangeText={(deskripsi) => setDeskripsi(deskripsi)}
          value={deskripsi}
        ></TextInput>
      </View>
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={updateList} style={styles.btnEdit}>
          <Text style={styles.txtBtn}>Perbarui</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={deleteList} style={styles.btnHapus}>
          <Text style={styles.txtBtn}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Edit;
