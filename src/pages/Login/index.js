import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { useState } from "react";
import database from "../../service/firebaseConnect";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ changeStatus }) {
  const [type, setType] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (type === "login") {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          changeStatus(userCredential.user.uid);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          changeStatus(userCredential.user.uid);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Seu Email"
        value={email}
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        placeholder="Sua Senha"
        value={password}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={[
          styles.handleLogin,
          { backgroundColor: type === "login" ? "#3ea6f2" : "#141414" },
        ]}
      >
        <Text style={styles.loginText}>
          {type === "login" ? "Acessar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType((type) => (type === "login" ? "cadatrar" : "login"))
        }
      >
        <Text style={{ textAlign: "center" }}>
          {type === "login" ? "Criar uma conta" : "Já possuo uma conta"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f2f6fc",
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#141414",
  },
  handleLogin: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 17,
  },
});
