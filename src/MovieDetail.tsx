import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
const MovieDetail = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const movieItem = router.params.item;
  console.log("her guncellemede calisacak", movieItem);
  useEffect(() => {
    // Sayfa yuklendikten sonra calismasi gereken fonksiyonlar useEffect icine yazilmali
    console.log("Burasi sadece sayfa yuklendikten sonra calisacak");
    setLoading(true);
    fetch(
      "https://movie-database-alternative.p.rapidapi.com/?r=json&i=" +
        movieItem.imdbID,
      {
        headers: {
          "x-rapidapi-key":
            "621bafacedmsh9ca783e4d9f4f95p17500bjsnaa2abedfa7ba",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result) {
          setMovieDetail(result);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  console.log("--------------------------------");
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text>{movieItem.Title}</Text>
      </View>
      <Image source={{ uri: movieDetail.Poster }} style={styles.poster}></Image>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={"white"} size={"large"} />
        </View>
      )}
    </SafeAreaView>
  );
};

// const width = Dimensions.get("screen").width;
// const height = Dimensions.get("screen").height;
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    columnGap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  poster: {
    width,
    height: width / 2,
    resizeMode: "contain",
    backgroundColor: "black",
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
export default MovieDetail;
