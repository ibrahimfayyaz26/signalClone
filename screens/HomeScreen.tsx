import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ChatItem from "../components/ChatItem/ChatItem";
import ChatRoom from "../assets/dummy-data/ChatRooms";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={ChatRoom}
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
