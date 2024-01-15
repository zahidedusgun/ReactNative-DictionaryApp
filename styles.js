// styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  results: {
   
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 20,
    padding: 30,
    marginTop: 30,
    marginBottom:50,
    marginHorizontal: 30, // Using marginHorizontal for both marginRight and marginLeft
  },
    
  text: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
  text2: {
    fontSize: 20,
    color: "red",
    fontFamily: "monospace",
    marginTop: 10,
  },
});
