import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";

// Color Palette used
const bubbleBgRight = "#1f5976";
const iconColor = "#5aabd4";

// Customizes the send icon
function renderSend(props) {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <IconButton icon="send-circle" size={40} color={iconColor} />
      </View>
    </Send>
  );
}

// Loading spinner
function renderLoading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // passes the props from the state of Start.js
    let name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "This is a system message",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  // adds the users input to the messages state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // Customizes the color of the text bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: bubbleBgRight,
          },
          left: {
            backgroundColor: "#fff",
          },
        }}
        textStyle={
          {
            // right: {
            //   color: "#000",
            // },
          }
        }
      />
    );
  }

  render() {
    // store the prop values that are passed
    const { name, color } = this.props.route.params;

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          //showUserAvatar
          alwaysShowSend
          renderSend={renderSend}
          renderLoading={renderLoading}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendingContainer: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
