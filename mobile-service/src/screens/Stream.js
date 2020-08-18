import React, { useRef, useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import NodeCameraView from "react-native-nodemediaclient/NodeCameraModule";
import ChatOverlay from "../components/ChatOverlay";

const Stream = ({ channel = "test" }) => {
  const ref = useRef();

  const [isLive, setIsLive] = useState(false);

  return (
    <View style={StyleSheet.absoluteFill}>
      <NodeCameraView
        style={StyleSheet.absoluteFill}
        ref={ref}
        outputUrl={`rtmp://192.168.1.26:1935/live/${channel}`}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        video={{
          preset: 12,
          bitrate: 400000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        autopreview
      />
      <View style={styles.control}>
        <Button
          onPress={() => {
            if (isLive) {
              setIsLive(false);
              ref.current.stop();
            } else {
              setIsLive(true);
              ref.current.start();
            }
          }}
          title={isLive ? "Go Offline" : "Go Live"}
          color={isLive ? "tomato" : "dodgerblue"}
        />
        <Button
          onPress={() => {
            ref.current.switchCamera()
          }}
          title={"Flip Camera"}
          color={"dodgerblue"}
        />
      </View>
      <View style={styles.chat}>
        <ChatOverlay channel="test" />
      </View>
    </View>
  );
};

export default Stream;

const styles = StyleSheet.create({
  control: {
    left: 10,
    top: 10,
    right: 10,
    flexDirection: 'row',
    position: "absolute",
    justifyContent: "space-around",
  },
  chat: {
    position: "absolute",
    bottom: 10,
    top: 50,
    right: 10,
    width: 200,
  },
});
