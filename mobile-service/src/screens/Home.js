import React, { useCallback } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
  useFocusEffect(
    useCallback(
      () =>{
        ScreenOrientation.lockAsync(
          ScreenOrientation.Orientation.PORTRAIT_UP
        )},
      []
    )
  );
  return (
    <View style={styles.container}>
      <Button
        title="Viewer"
        color="dodgerblue"
        onPress={() => navigation.navigate("Viewer")}
      />
      <Button
        title="Streamer"
        color="tomato"
        onPress={() => navigation.navigate("Stream")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    margin: 60,
  }
});
