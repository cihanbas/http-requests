import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
let searchValue = "";

function HomeScreen() {
  // state'ler
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  //
  const navigation = useNavigation();
  const onSearch = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append(
      "x-rapidapi-key",
      "621bafacedmsh9ca783e4d9f4f95p17500bjsnaa2abedfa7ba"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://movie-database-alternative.p.rapidapi.com/?s=${searchValue}&r=json&page=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setLoading(false);
        if (result.Search) {
          setMovieList(result.Search);
        } else {
          alert("Film Bulunamadi");
          setMovieList([]);
        }
      })
      .catch((error) => {
        alert("Film Bulunamadi");
      });
  };
  const navigateToDetail = (item) => {
    navigation.navigate("Detail", { item });
    console.log("item", item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchBar}
          onChangeText={(text) => {
            searchValue = text;
          }}
        />
        {loading ? (
          <ActivityIndicator size={"small"} color={"blue"} />
        ) : (
          <Pressable onPress={() => onSearch()}>
            <AntDesign name="search1" size={24} color="black" />
          </Pressable>
        )}
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {movieList.map((movie) => (
          <Pressable
            style={styles.movieItem}
            key={movie.imdbID}
            onPress={() => navigateToDetail(movie)}
          >
            <Image
              source={{ uri: movie.Poster }}
              style={styles.movieImg}
            ></Image>
            <View style={styles.movieItemTextWrapper}>
              <Text numberOfLines={2} style={styles.movieText}>
                {movie.Title}
              </Text>
              <Text>{movie.Year}</Text>
              <Text>{movie.imdbID}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    backgroundColor: "white",
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  searchBar: {
    backgroundColor: "#eee",
    padding: 8,
    flex: 1,
    borderRadius: 8,
  },
  movieImg: {
    height: width / 4,
    width: width / 4,
    resizeMode: "contain",
  },
  movieItem: {
    flexDirection: "row",
    columnGap: 8,
    backgroundColor: "white",
    marginBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  movieItemTextWrapper: {
    rowGap: 8,
    flex: 1,
    overflow: "hidden",
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});
export default HomeScreen;
