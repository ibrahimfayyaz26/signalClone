import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Users } from "../../src/models";
import { Auth, DataStore } from "aws-amplify";

const Message = ({ message }) => {
  const [user, setUser] = useState<Users | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    DataStore.query(Users, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return;
      }
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  if (!user) {
    return <ActivityIndicator />;
  }
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rigthContainer : styles.LeftContainer,
      ]}
    >
      <Text style={{ color: isMe ? "black" : "white" }}>{message.content}</Text>
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
