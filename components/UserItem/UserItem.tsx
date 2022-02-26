import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUsers } from "../../src/models";
import { Users } from "../../src/models";

const UserItem = ({ User }) => {
  const navigation = useNavigation();

  const press = async () => {
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(Users, authUser.attributes.sub);
    await DataStore.save(
      new ChatRoomUsers({ users: dbUser, chatRoom: newChatRoom })
    );
    await DataStore.save(
      new ChatRoomUsers({ users: User, chatRoom: newChatRoom })
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };
  return (
    <Pressable onPress={press} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: User.imageUri,
        }}
      />
      <View style={styles.rigthContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{User.name} </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UserItem;
