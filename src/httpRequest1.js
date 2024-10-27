import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  Text,
  Pressable,
} from "react-native";

export default function App() {
  const [listData, setListData] = useState([]);
  const getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((liste) => {
        setListData(liste);
      })
      .catch((err) => {
        // hata yakalama
        console.log("err", err);
      });
  };
  const getPost = (id) => {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/posts/` + id)
      .then((r) => r.json())
      .then((user) => {
        console.log("user", user);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="GET Posts" onPress={() => getPosts()}></Button>
      <Button title="GET Post" onPress={() => getPost()}></Button>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {listData.map((post) => (
          <Pressable
            key={post.id}
            style={{ padding: 10, flexDirection: "row", columnGap: 10 }}
            onPress={() => getPost(post.id)}
          >
            <Text>{post.id}</Text>
            <Text numberOfLines={1}>{post.title}</Text>
          </Pressable>
        ))}
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
