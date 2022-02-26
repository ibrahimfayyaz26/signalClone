import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Message from "../components/Message/Message";
import Chats from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput/MessageInput";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore, SortDirection } from "aws-amplify";
import { ChatRoom, Message as MessageModel } from "../src/models";

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  const route = useRoute();
  const navigation = useNavigation();

  console.warn("Displaying chat room: ", route.params?.id);
  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  // useEffect(() => {
  //   const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
  //     console.log(msg.model, msg.opType, msg.element);
  //     if (msg.model === MessageModel && msg.opType === "INSERT") {
  //       setMessages((existingMessage) => [msg.element, ...existingMessage]);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Couldn't find a chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    console.log(fetchedMessages);
    setMessages(fetchedMessages);
  };

  navigation.setOptions({ title: "Elon Musk" });

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  // const route = useRoute();
  // const navigation = useNavigation();

  // console.warn("Displaying chat room: ", route.params?.id);

  // navigation.setOptions({ title: "Elon Musk" });

  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Message message={item} />;
        }}
        inverted
        showsHorizontalScrollIndicator={false}
      />
      <MessageInput chatRoom={chatRoom} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default ChatRoomScreen;
