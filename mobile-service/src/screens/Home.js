import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Home = ({ navigation }) => {
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
