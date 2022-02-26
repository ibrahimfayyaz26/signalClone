import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import {
  ColorSchemeName,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types";
import UserScreen from "../screens/UsersScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        options={{ headerTitle: HomeHeader }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="ChatRoom"
        options={{
          headerTitle: ChatRoomHeader,
          headerBackTitleVisible: false,
        }}
        component={ChatRoomScreen}
      />
      <Stack.Screen
        name="Users"
        options={{
          headerTitle: "Users",
          headerBackTitleVisible: false,
        }}
        component={UserScreen}
      />
    </Stack.Navigator>
  );
}

const HomeHeader = (props) => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          marginLeft: 30,
          fontWeight: "bold",
        }}
      >
        Signal
      </Text>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{ marginHorizontal: 5 }}
      />
      <Feather
        onPress={() => {
          navigation.navigate("Users");
        }}
        name="edit-2"
        size={24}
        color="black"
        style={{ marginHorizontal: 15 }}
      />
    </View>
  );
};

const ChatRoomHeader = (props) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 40,
        marginLeft: -30,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Text
        style={{ flex: 1, marginLeft: 10, fontWeight: "bold", fontSize: 18 }}
      >
        {props.children}
      </Text>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
      <Feather
        name="edit-2"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};
