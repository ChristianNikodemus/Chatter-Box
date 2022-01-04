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
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Image,
} from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";

// Import Mapview for location of user
import MapView from "react-native-maps";

// Import CustomActions button component
import CustomActions from "./CustomActions";

// Import asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import NetInfo
import NetInfo from "@react-native-community/netinfo";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

// ---------------- Importing Firebase ----------------

// Import Firestore
const firebase = require("firebase");
require("firebase/firestore");

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// ---------------- Importing Firebase ----------------

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

// Stores messages if sent offline
let offlineMessages = [];

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      isConnected: false,
      image: null,
      location: null,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC87PL6QZzNv_cDEPN1lPMIFNmymvOfiNg",
        authDomain: "chatter-box-5b35a.firebaseapp.com",
        projectId: "chatter-box-5b35a",
        storageBucket: "chatter-box-5b35a.appspot.com",
        messagingSenderId: "248903869601",
        appId: "1:248903869601:web:567a751273290f98b6bce0",
        measurementId: "G-6P9485JZ12",
      });
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  // Stores the messages with AsyncStorage
  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Saves messages to the state through AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // Deletes messages from the state through AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // Checks if the user is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        console.log("online");
        this.setState({ isConnected: true });

        // Signs in a new user
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          } else {
            this.setState({
              uid: user.uid,
              //messages: [],
            });

            // Referencing messages of current user
            this.referenceChatUser = firebase
              .firestore()
              .collection("messages")
              .where("uid", "==", this.state.uid);

            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate.bind(this));
          }
        });

        // Recieves updates about firebase collection
        this.referenceChatMessages = firebase
          .firestore()
          .collection("messages");
      } else {
        console.log("offline");
      }
    });

    // Listens for any messages the user added while offline
    NetInfo.addEventListener((state) => {
      if (state.isConnected && offlineMessages.length > 0) {
        while (offlineMessages.length !== 0) {
          const message = offlineMessages.shift();
          this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: { _id: this.state.uid, name: this.props.route.params.name },
            uid: this.state.uid,
            location: message.location || null,
          });
        }
      }
    });

    // Loads messages from AsyncStorage
    this.getMessages();

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
          text: `Welcome to Chatter Box, ${name}!`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  renderInputToolbar(props) {
    //if (this.state.isConnected) {
    return <InputToolbar {...props} />;
    //}
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // Function that updates messages to firestore
  onCollectionUpdate(querySnapshot) {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        location: data.location || null,
      });
    });
    this.setState({ messages });
  }

  // Adds message to firestore collection
  addMessages() {
    const message = this.state.messages[0];
    if (this.state.isConnected) {
      this.referenceChatMessages.add({
        _id: message._id,
        text: message.text || "",
        createdAt: message.createdAt,
        user: { _id: this.state.uid, name: this.props.route.params.name },
        uid: this.state.uid,
        location: message.location || null,
      });
    } else {
      offlineMessages.push(message);
    }
  }

  // adds the users input to the messages state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
        this.saveMessages();
      }
    );
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

  // Renders the action button
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // Renders the map location of a user
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 250, height: 200, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    // store the prop values that are passed
    const { name, color } = this.props.route.params;

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: this.state.uid }}
          showUserAvatar
          alwaysShowSend
          renderSend={renderSend}
          renderLoading={renderLoading}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
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
