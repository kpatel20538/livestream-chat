import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import ChatOverlay from "../components/ChatOverlay";

const Viewer = ({ channel = "test" }) => {
  const [author] = useState(
    () => `TestUser-${Math.floor(Math.random() * 100)}`
  );
  const [color] = useState(
    () =>
      [
        "tomato",
        "orange",
        "dodgerblue",
        "mediumseagreen",
        "gray",
        "slateblue",
        "violet",
        "lightgray",
      ][Math.floor(Math.random() * 8)]
  );

  const ref = useRef();
  return (
    <View style={{ flex: 1, alignItems: "stretch" }}>
      <Video
        ref={ref}
        source={{
          uri: `https://ingress-kpatel20538.cloud.okteto.net/hls/${channel}.m3u8`,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        useNativeControls
        style={{ height: 300 }}
      />
      <ChatOverlay inputEnabled author={author} color={color} />
    </View>
  );
};

export default Viewer;

const styles = StyleSheet.create({});
