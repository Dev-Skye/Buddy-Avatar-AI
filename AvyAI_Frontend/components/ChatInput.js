import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatInput({
  input,
  setInput,
  handleSendText,
  recording,
  startRecording,
  stopRecording,
  loading,
  styles,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
        onSubmitEditing={() => handleSendText(input)}
      />
      <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.micButton}>
        <Ionicons name={recording ? "stop" : "mic"} size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSendText(input)}
        style={[styles.sendButton, loading && { opacity: 0.5 }]}
        disabled={loading}
      >
        <Ionicons name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


