import { useEffect, useState } from "react";

import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import "react-native-gesture-handler";

import Login from "./src/pages/Login";
import { TouchableOpacity } from "react-native";
import Listagem from "./src/pages/listagem/Listagem";
import database from "./src/service/firebaseConnect";
import { child, onValue, push, ref, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function data() {
      const userId = getAuth().currentUser.uid;

      return await onValue(
        ref(database, "/Usuarios/" + userId),
        (snapshot) => {
          snapshot.forEach((childItem) => {
            const data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };

            console.log(data);

            setTasks((old) => [...old, data]);
          });
        },
        {
          onlyOnce: true,
        }
      );
    }

    data();
  }, [user]);

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  function handleAdd() {
    if (newTask === "") {
      return;
    }

    const newPostKey = push(child(ref(database), "Usuarios")).key;

    const taskData = {
      nome: newTask,
    };

    const updates = {};

    updates[newPostKey] = taskData;

    update(ref(database, "/Usuarios/" + `/${user}/`), updates).then(() => {
      const data = {
        key: newPostKey,
        nome: newTask,
      };

      setTasks((oldTasks) => [...oldTasks, data]);
    });

    Keyboard.dismiss();
    setNewTask("");

    return;
  }

  function handleDelete(key) {
    const userId = getAuth().currentUser.uid;

    remove(ref(database, "Usuarios" + `/${userId}/` + `/${key}/`)).then(() => {
      const findtask = tasks.filter((item) => item.key !== key);
      setTasks(findtask);
    });
    console.log(key);
  }

  function handleEdit(data) {
    console.log(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="Qual a proxima tarefa?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.bntAdd} onPress={handleAdd}>
          <Text style={{ color: "#fff", fontSize: 22 }}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Listagem
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
  },
  containerTask: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
  },
  bntAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
});
