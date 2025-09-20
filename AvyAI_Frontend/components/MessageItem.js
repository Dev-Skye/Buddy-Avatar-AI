import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MessageItem({ item, togglePlay, playingId, styles }) {
  const isUser = item.sender === "user";

  return (
    <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
      {item.isTyping ? (
        <Text style={[styles.messageText, { fontStyle: "italic", color: "#555" }]}>{item.text}</Text>
      ) : item.audio ? (
        <TouchableOpacity onPress={() => togglePlay(item.audio, item.id)} style={styles.audioContainer}>
          <Ionicons name={playingId === item.id ? "pause" : "play"} size={20} color={isUser ? "#fff" : "#000"} />
          <Text style={[styles.audioText, isUser ? { color: "#fff" } : { color: "#000" }]}>
            {isUser ? "Your voice" : "Buddy"}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.messageText, isUser ? { color: "#fff" } : { color: "#000" }]}>{item.text}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  
})