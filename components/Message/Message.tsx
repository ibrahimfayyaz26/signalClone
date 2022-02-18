import { StyleSheet, Text, View } from "react-native";
import React from "react";

const myID = "u1";

const Message = ({ message }) => {
  const isMe = message.user.id == myID;
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rigthContainer : styles.LeftContainer,
      ]}
    >
      <Text style={{ color: isMe ? "black" : "white" }}>
        {message.content}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  rigthContainer: {
    backgroundColor: "lightgrey",
    marginLeft: "auto",
    marginRight: 10,
  },
  LeftContainer: {
    backgroundColor: "#3777f0",
    marginLeft: 10,
    marginRight: "auto",
  },
});

export default Message;
