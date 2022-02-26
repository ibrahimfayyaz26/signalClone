import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ChatItem from "../components/ChatItem/ChatItem";
// import ChatRoom from "../assets/dummy-data/ChatRooms";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoomUsers } from "../src/models";

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRomms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const data = (await DataStore.query(ChatRoomUsers))
        .filter((ch) => ch.users.id == authUser.attributes.sub)
        .map((cha) => cha.chatRoom);
      setChatRooms(data);
    };
    fetchChatRomms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem Chat={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
