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
} from "react-native";
import { block } from "react-native-reanimated";
//import { TouchableOpacity } from "react-native-web";

//Import images
import bgImg from "../assets/bg-img.png";
import icon from "../assets/account-icon.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "",
    };
  }

  changeBgColor = (newColor) => {
    this.setState({ color: newColor });
  };

  // background color choices
  colors = {
    black: "#090C08",
    purple: "#474056",
    blue: "#8A95A5",
    yellow: "#B9C6AE",
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImg} resizeMode="cover" style={styles.image}>
          <Text style={styles.header}>Chatter Box</Text>
          <View style={styles.box1}>
            <View style={styles.textBoxWrapper}>
              <Image source={icon} fadeDuration={0} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            <View style={styles.bgColor}>
              <Text style={styles.bgText}>Choose Background Color:</Text>
              <View style={styles.bgSamplesWrapper}>
                <TouchableOpacity
                  style={[styles.bgColorButton, styles.bgColor1]}
                  onPress={() => this.changeBgColor(this.colors.black)}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bgColorButton, styles.bgColor2]}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bgColorButton, styles.bgColor3]}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bgColorButton, styles.bgColor4]}
                ></TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              // title="Start Chatting"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 150,
    fontSize: 45,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  box1: {
    backgroundColor: "white",
    //flex: 1,
    //justifyContent: "flex-end",
    width: "88%",
    marginBottom: "12%",
    padding: "6%",
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
  bgColor1: {
    backgroundColor: "#090C08",
  },
  bgColor2: {
    backgroundColor: "#474056",
  },
  bgColor3: {
    backgroundColor: "#8A95A5",
  },
  bgColor4: {
    backgroundColor: "#B9C6AE",
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
