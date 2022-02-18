import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ChatItem = ({ Chat }) => {
  const navigation = useNavigation();

  const press = () => {
    navigation.navigate("ChatRoom", { id: Chat.id });
  };

  return (
    <Pressable onPress={press} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: Chat.users[1].imageUri,
        }}
      />
      {Chat.message && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{Chat.message}</Text>
        </View>
      )}
      <View style={styles.rigthContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{Chat.users[1].name} </Text>
          <Text style={styles.text}>{Chat.lastMessage.createdAt} </Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {Chat.lastMessage.content}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;
