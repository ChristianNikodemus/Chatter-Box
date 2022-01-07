# Chatter Box

## Objective

To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

### User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

### Technical Requirements

- Written in React Native.
- Developed using Expo.
- Styled according to a given screen design.
- Chat conversations are stored in Google Firestore Database. (https://firebase.google.com/)
- Authenticates users anonymously via Google Firebase authentication.
- Chat conversations are stored locally.
- Lets users pick and send images from the phone’s image library.
- Lets users take pictures with the device’s camera app, and send them.
- Stores images in Firebase Cloud Storage.
- Is able to read the user’s location data.
- Location data can be sent via the chat in a map view.
- The chat interface and functionality is created using the Gifted Chat library. (https://github.com/FaridSafi/react-native-gifted-chat)
- The app’s codebase contains comments.

## Installation Guide

First ensure that Node.js is up to date on your machine for it to work successfully by entering the following command in your terminal:
`npm install -g npm`

Then, you must install Expo CLI, in terminal please enter the command:
`npm install expo-cli --global`

Then, clone the repostory to your machine:
`https://github.com/ChristianNikodemus/Chatter-Box.git`

Navigate to the repository in your terminal and enter the command:
`npm install`

Then enter:
`expo start` or `npm start`

Expo will build the app and open in your browser, there you find options to run through a simulator such as:

- The app `Expo` in the Apple App Store or Google Play; or
- Install Xcode on your machine and then navigate to `Xcode > Open Developer Tool > Simulator`
