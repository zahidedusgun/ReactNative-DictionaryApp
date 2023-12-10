import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [word, setWord] = React.useState("");
  const [checkedWord, setCheckedWord] = React.useState("");
  const [definition, setDefinition] = React.useState("");

  const searchWord = (getWord) => {
    setWord(getWord);
    console.log(getWord);
  };

  requestAPI = () => {
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        setCheckedWord(word);

        var definition = response[0].meanings[0].definitions[0].definition;
        setDefinition(definition);
        console.log(response[0].phonetic);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("./assets/bg.jpg")}
      >
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a word"
            textAlign="center"
            clearButtonMode="always"
            onChangeText={searchWord}
            value={word}
          />
          <TouchableOpacity style={styles.searchIconContainer}
          onPress={requestAPI}
          >
            <Image
              source={require("./assets/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.trashIconContainer}>
            <Image
              source={require("./assets/trash.png")}
              style={styles.trashIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>{definition}</Text>
          <Text style={styles.text}>{definition}</Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 40,
    marginRight: 40,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: "white",
    marginTop: 220,
    marginRight: 10,
    shadowColor: "#100",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 220,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  trashIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 220,
    marginLeft: 8,
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
  text:{
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  }
});
