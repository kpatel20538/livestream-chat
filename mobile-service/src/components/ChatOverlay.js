import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

const Message = ({ author, body, color, transparent }) => {
  return (
    <View style={styles.message}>
      <Text style={[styles.author, { color }]}>{author}: </Text>
      <Text style={[styles.body, { color: transparent ? "white" : "black" }]}>
        {body}
      </Text>
    </View>
  );
};

const Input = ({ onPress }) => {
  const [body, setBody] = useState("");

  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} value={body} onChangeText={setBody} />
      <Button
        title="Send"
        color="dodgerblue"
        disabled={!body}
        onPress={() => {
          onPress(body);
          setBody("");
        }}
      />
    </View>
  );
};

const ChatOverlay = ({
  author = "TestUser",
  color = "dodgerblue",
  channel = "test",
  inputEnabled,
}) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const response = await fetch(
        `https://ingress-kpatel20538.cloud.okteto.net/chat/latest/${channel}`
      );
      const data = await response.json();
      if (!canceled) {
        data.reverse();
        setMessages(data);
      }
    })();
    return () => {
      canceled = true;
    };
  }, [channel]);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://ingress-kpatel20538.cloud.okteto.net/chat/messages/${channel}`
    );
    const listener = ({ data }) => {
      const message = JSON.parse(data);

      setMessages((m) => {
        if (!messages.find(({ id }) => message.id === id)) {
          return [message, ...m];
        }
        return m;
      });
    };

    ws.addEventListener("message", listener);
    setSocket(ws);
    return () => {
      ws.removeEventListener("message", listener);
      ws.close();
    };
  }, [channel]);

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        style={styles.list}
        contentContainerStyle={styles.content}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Message key={item.id} {...item} transparent={!inputEnabled} />}
      />
      {inputEnabled && (
        <Input
          onPress={(body) =>
            socket && socket.send(JSON.stringify({ author, body, color }))
          }
        />
      )}
    </View>
  );
};

export default ChatOverlay;

const styles = StyleSheet.create({
  author: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  list: {
    flex: 1,
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  message: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 5,
  },
  body: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  input: {
    flex: 1,
    borderColor: "gainsboro",
    borderWidth: 1,
    fontWeight: "bold",
    backgroundColor: "white",
  },
});
