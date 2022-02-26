import { DataStore } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import UserItem from "../components/UserItem/UserItem";
import { Users } from "../src/models";

export default function UserScreen() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    DataStore.query(Users).then(setUsersData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={usersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserItem User={item} />}
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
