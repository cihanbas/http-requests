import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
let searchValue = "";
const data = {
  Title: "Harry Potter and the Deathly Hallows: Part 2",
  Year: "2011",
  imdbID: "tt1201607",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg",
};
function HomeScreen() {
  const onSearch = () => {
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
      "https://movie-database-alternative.p.rapidapi.com/?s=harry&r=json&page=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result.Search))
      .catch((error) => console.error(error));
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
        <Pressable onPress={() => onSearch()}>
          <AntDesign name="search1" size={24} color="black" />
        </Pressable>
      </View>
      <Pressable style={styles.movieItem}>
        <Image source={{ uri: data.Poster }} style={styles.movieImg}></Image>
        <View style={styles.movieItemTextWrapper}>
          <Text>{data.Title}</Text>
          <Text>{data.Year}</Text>
          <Text>{data.imdbID}</Text>
        </View>
      </Pressable>
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
  },
  movieItemTextWrapper: {
    rowGap: 8,
  },
});
export default HomeScreen;
