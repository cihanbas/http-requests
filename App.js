import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, Button, ScrollView, Text } from "react-native";

export default function App() {
  const [listData, setListData] = useState([]);
  const getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((liste) => {
        setListData(liste);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="GET Data" onPress={() => getUsers()}></Button>
      <ScrollView>
        <Text>{listData.length}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    justifyContent: "center",
  },
});
