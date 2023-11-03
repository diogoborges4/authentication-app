import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import dataData from "../../service/firebaseConnect";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { useEffect } from "react";
import {
  push,
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import Listagem from "../listagem/Listagem";
import database from "../../service/firebaseConnect";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");

  const navigation = useNavigation();

  /* useEffect(() => {
    async function data() {
      return onValue(
        ref(database, "Usuarios"),
        (snapshot) => {
          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              Nome: childItem.val().Nome,
              Cargo: childItem.val().Cargo,
            };

            setUsers((oldArray) => [...oldArray, data]);
            console.log(users);
          });
        },
        {
          onlyOnce: true,
        }
      );
    }
    /*async function setData() {
      await update(ref(database, "Usuarios/2"), {
        Idade: 27,
        Nome: "roberto",
      });
    }
    
    setData();
    data();
  }, []);*/

  async function cadastrar() {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        // Signed in

        const postData = {
          Email: email,
          Password: password,
        };

        const newPostKey = push(
          child(ref(database), "Usuarios", value.user.uid)
        );

        const updates = {};
        updates[newPostKey] = postData;

        return update(child(ref(database), "Usuarios"), updates);

        // ...
      })
      .catch((error) => {
        alert(error);
      });
    navigation.navigate("About");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid={"transparent"}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.texto}>Password</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid={"transparent"}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Novo funcionario" onPress={cadastrar} />

      <Text>{users}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#121212",
    height: 40,
    fontSize: 17,
  },
});

export default Home;
