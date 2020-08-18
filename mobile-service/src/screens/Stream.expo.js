import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Stream = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}> Disabled in Expo Client </Text>
      <Button
        title="Go Back"
        color="tomato"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Stream;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-around",
    alignItems: "stretch",
    margin: 60,
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
