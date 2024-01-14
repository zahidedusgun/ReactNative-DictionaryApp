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
import * as Speech from "expo-speech";
import { styles } from "./styles";
export default function App() {
  const [word, setWord] = React.useState("");
  const [checkedWord, setCheckedWord] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [phonetic, setPhonetic] = React.useState("");
  const [kind, setKind] = React.useState("");
  const [example, setExample] = React.useState("");

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

        var phonetic = response[0].phonetic;
        setPhonetic(phonetic);

        var kind = response[0].meanings[0].partOfSpeech;
        setKind(kind);
        console.log(kind);

        var example = response[0].meanings[1].definitions[1].example;
        setExample(example);
        console.log("example",example);

      })
      .catch((error) => {
        console.log(error);
      });
  };
  const speak = () => {
    Speech.speak(checkedWord);
  };
  const clear = () => {
    setWord("");
    setCheckedWord("");
    setDefinition("");
    setPhonetic("");
    setKind("");
    setExample("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("./assets/bg.jpg")}
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => speak()}>
            <Image
              source={require("./assets/voice.png")}
              style={{
                width: 30,
                height: 30,
                marginTop: 220,
                marginLeft: 8,
                marginRight: 18,
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter a word"
            textAlign="center"
            clearButtonMode="always"
            onChangeText={searchWord}
            value={word}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={requestAPI}
          >
            <Image
              source={require("./assets/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trashIconContainer}
            onPress={() => {
              clear();
            }}
          >
            <Image
              source={require("./assets/trash.png")}
              style={styles.trashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.results}>
          <Text style={styles.text}>{checkedWord}         {phonetic}</Text>
          <Text style={styles.text2}>{kind}</Text>
          <Text style={styles.text}>{definition}</Text>
          <Text style={styles.text}>- {example}</Text>

        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

