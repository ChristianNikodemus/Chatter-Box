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

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let name = this.props.route.params.name;

    let color = this.props.route.params.color;

    this.props.navigation.setOptions({ title: name });
  }

  //componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
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
    backgroundColor: color ? color : "#fff",
  },
});
