import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoomUsers, Users, Message } from "../../src/models";
const ChatItem = ({ Chat }) => {
  const navigation = useNavigation();

  const [chatRoomUser, setChatRoomUser] = useState([]);
  const [lastMessage, setLastMessage] = useState<Message | undefined>();

  useEffect(() => {
    const fetchChatRomms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const data = (await DataStore.query(ChatRoomUsers))
        .filter((ch) => ch.chatRoom.id == Chat.id)
        .map((cha) => cha.users);
      setChatRoomUser(
        data.find((user) => user.id !== authUser.attributes.sub || null)
      );
    };
    fetchChatRomms();
  }, []);

  useEffect(() => {
    if (!Chat.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, Chat.chatRoomLastMessageId).then(setLastMessage);
  }, []);
  // console.log(Chat, chatRoomUser);

  const press = () => {
    navigation.navigate("ChatRoom", { id: Chat.id });
  };

  if (!chatRoomUser) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <Pressable onPress={press} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: chatRoomUser.imageUri,
        }}
      />
      {!!Chat.newMessages && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{Chat.newMessages}</Text>
        </View>
      )}
      <View style={styles.rigthContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{chatRoomUser.name} </Text>
          <Text style={styles.text}>{lastMessage?.createdAt} </Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;
