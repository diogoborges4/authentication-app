import React from "react";
import { Button } from "react-native";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { View } from "react-native";

const Listagem = ({ data, deleteItem, editItem }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => deleteItem(data.key)}>
        <Text style={styles.text}>X</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => editItem(data)}>
        <Text>{data.nome}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#ee4564",
  },
  text: {
    color: "#fff",
    fontSize: 17,
  },
});

export default Listagem;
