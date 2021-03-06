import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { block } from "react-native-reanimated";
//import { TouchableOpacity } from "react-native-web";

//Import images
import bgImg from "../assets/bg-img.png";
import icon from "../assets/account-icon.png";

// color of color button border
const colorBorder = "#F58335";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "",
    };
  }

  // This changes the state to the new color submitted by onPress
  changeBgColor = (newColor) => {
    this.setState({ color: newColor });
  };

  // background color choices and buttons
  colors = {
    black: "#090C08",
    purple: "#474056",
    blue: "#8A95A5",
    yellow: "#B9C6AE",
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Background image and header text */}
        <ImageBackground
          accessible={true}
          accessibilityLabel="Background image"
          accessibilityHint="Image of people chatting."
          accessibilityRole="image"
          source={bgImg}
          resizeMode="cover"
          style={styles.image}
        >
          <Text
            accessible={true}
            accessibilityLabel="Chatter box header"
            //accessibilityHint=""
            accessibilityRole="text"
            style={styles.header}
          >
            Chatter Box
          </Text>

          {/* Box that outlines the user input and color selection */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.box1}
          >
            <View style={styles.textBoxWrapper}>
              <Image source={icon} fadeDuration={0} style={styles.icon} />
              <TextInput
                accessible={true}
                accessibilityLabel="Name text-input form"
                accessibilityHint="Enter your name that will be used in the chat page."
                accessibilityRole="adjustable"
                style={styles.textInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            <View style={styles.bgColor}>
              <Text style={styles.bgText}>Choose Background Color:</Text>
              <View style={styles.bgSamplesWrapper}>
                {/* This loop cycles through the colors array and applies the the same styles for all */}
                {Object.values(this.colors).map((color) => (
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Choose background color"
                    accessibilityHint="Let's you choose the background color for the chat page."
                    accessibilityRole="button"
                    key={color}
                    style={{
                      ...styles.bgColorButton,
                      backgroundColor: color,
                      borderWidth: 3,
                      borderColor:
                        this.state.color === color
                          ? colorBorder
                          : "transparent",
                    }}
                    onPress={() => {
                      this.changeBgColor(color);
                    }}
                  ></TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start Chatting Button"
              accessibilityHint="Button to click and enter the chat room."
              accessibilityRole="button"
              style={styles.button}
              // title="Start Chatting"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  //This passes the state through the props to the Chat.js page
                  name: this.state.name,
                  color: this.state.color || "#fff",
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginTop: 100,
    marginBottom: 100,
    fontSize: 45,
    fontWeight: "bold",
    //fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    flexGrow: 1,
  },
  box1: {
    backgroundColor: "white",
    //justifyContent: "flex-end",
    width: "88%",
    marginLeft: 48,
    marginRight: 48,
    marginBottom: "12%",
    padding: "6%",
    borderRadius: 5,
  },
  textBoxWrapper: {
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: "6%",
  },
  icon: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: "stretch",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    height: "100%",
    width: "100%",
    padding: 10,
    //opacity: "50%",
  },
  bgColor: {
    marginBottom: "6%",
  },
  bgText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    //opacity: "100%",
  },
  bgSamplesWrapper: {
    flexDirection: "row",
  },
  bgColorButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#757083",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
