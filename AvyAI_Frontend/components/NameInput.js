import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function NameInput({ name, setName, handleNext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>What name should I call you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        placeholderTextColor="#fff"
        onChangeText={setName}
      />
      <TouchableOpacity
        style={[styles.nextButton, !name.trim() && { opacity: 0.5 }]}
        onPress={handleNext}
        disabled={!name.trim()}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00025cff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    fontFamily: "Poppins-Medium",
    padding: 12,
    marginBottom: 20,
    color: "#fff",
  },
  nextButton: {
    backgroundColor: "#0078fe",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  nextButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
});
