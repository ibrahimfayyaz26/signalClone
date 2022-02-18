import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Message from "../components/Message/Message";
import Chats from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput/MessageInput";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  console.warn("Displaying chat room: ", route.params?.id);

  navigation.setOptions({ title: "Elon Musk" });

  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        data={Chats.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Message message={item} />;
        }}
        inverted
        showsHorizontalScrollIndicator={false}
      />
      <MessageInput />
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
