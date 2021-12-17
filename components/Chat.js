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

let color = "teal";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let name = this.props.route.params.name;

    let color = this.props.route.params.color;

    this.props.navigation.setOptions({ title: name });
  }

  render() {
    // store the prop values that are passed
    const { name, color } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text>Hello, {name}! welcome to Chatter Box!</Text>
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
    backgroundColor: color ? color : "#fff",
  },
});
