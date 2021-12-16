import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
//import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = this.props.route.params.name;

    let bgColor = this.props.route.params.bgColor;

    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor ? bgColor : "#fff",
        }}
      >
        <Text>Hello, {name}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
