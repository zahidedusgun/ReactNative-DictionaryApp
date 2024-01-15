import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const searchWord = (getWord) => {
    setWord(getWord);
    console.log(getWord);
  };

  const requestAPI = () => {
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        setResults(response.slice(0, 5)); 
        console.log(response);
        setExpandedIndex(null); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const speak = (wordToSpeak) => {
    Speech.speak(wordToSpeak);
  };

  const clear = () => {
    setWord("");
    setResults([]);
    setExpandedIndex(null); // Reset expanded index
  };

  const toggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: "100%" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("./assets/bg.jpg")}
        >
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={() => speak(results[0]?.word)}>
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
            <TouchableOpacity style={styles.trashIconContainer} onPress={clear}>
              <Image
                source={require("./assets/trash.png")}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          </View>
          {results.map((result, index) => (
            <View style={styles.results} key={`result${index}`}>
              <TouchableOpacity onPress={() => toggleAccordion(index)}>
              <Text style={{ ...styles.text, fontWeight: 'bold', color: '#D14043', marginBottom:2 }}>
  {result.meanings[0]?.partOfSpeech}
</Text>

              </TouchableOpacity>
              {expandedIndex === index && (
                <>
                  <Text style={styles.text}>
                    {result.phonetic}
                  </Text>
                  <Text style={styles.text}>
                    {result.meanings[0]?.definitions[0]?.definition}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold", color: "#D14043" }}>
                      Example:
                    </Text>{" "}
                    {result.meanings[0]?.definitions[0]?.example || "Not found"}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold", color: "#D14043" }}>
                      Synonyms:
                    </Text>{" "}
                    {result.meanings[0]?.synonyms.slice(0, 5).join(", ") ||
                      "Not found"}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold", color: "#D14043" }}>
                      Antonyms:
                    </Text>{" "}
                    {result.meanings[0]?.antonyms.slice(0, 5).join(", ") ||
                      "Not found"}
                  </Text>
                </>
              )}
            </View>
          ))}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
}
