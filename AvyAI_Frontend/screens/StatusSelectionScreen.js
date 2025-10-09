import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import NameInput from "../components/NameInput";

const statusOptions = [
  { key: "student", label: "Student", image: require("../assets/images/student.png") },
  { key: "patient", label: "Patient", image: require("../assets/images/patient.png") },
  { key: "elder", label: "Elder", image: require("../assets/images/elder.png") },
  { key: "friend", label: "Friend", image: require("../assets/images/friend.png") },
];

export default function StatusSelectionScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const BACKEND_URL = "https://buddy-avatar-ai.onrender.com";

  const handleNext = async () => {
  if (step === 1 && name.trim() !== "") {
    setStep(2);
  } else if (step === 2 && selectedStatus) {
    try {
      const response = await fetch(`${BACKEND_URL}/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          status: selectedStatus,
          message: "INIT", // 👈 triggers backend’s welcome flow
        }),
      });

      const data = await response.json();

      navigation.navigate("Chat", {
        name,
        status: selectedStatus,
        initialMessage: data.replies[0], // welcome from backend
      });
    } catch (error) {
      console.error("Error starting chat:", error);
      navigation.navigate("Chat", { name, status: selectedStatus });
    }
  }
};



  // Step 1: Name input
  if (step === 1) {
    return (
      <NameInput name={name} setName={setName} handleNext={handleNext} />
    );
  }

  // Step 2: Status selection

return (
  <View style={styles.container}>
    <View style={styles.statusWrapper}>
      <Text style={styles.questionText}>Chat with Buddy as:</Text>
      <FlatList
        data={statusOptions}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => {
          const isSelected = selectedStatus === item.key;
          return (
            <TouchableOpacity
              style={[styles.statusCard, isSelected && styles.statusCardSelected]}
              onPress={() => setSelectedStatus(item.key)}
            >
              <Image source={item.image} style={styles.statusImage} resizeMode="contain" />
              <Text style={styles.statusLabel}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={[styles.nextButton, !selectedStatus && { opacity: 0.5 }]}
        onPress={handleNext}
        disabled={!selectedStatus}
      >
        <Text style={styles.nextButtonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  </View>
);


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00025cff",
    padding: 20,
    justifyContent:'center'
  },
  questionText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 19,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: '#fff'
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#0078fe",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  statusCard: {
    width: "45%",
    margin: "2.5%",
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    alignItems: "center",
    padding: 15,
    borderWidth: 4,
    borderColor: "transparent", // default border
  },
  statusCardSelected: {
    borderColor: "green", // highlight selected card in green
  },
  statusImage: { width: 150, height: 150, marginBottom: 10 },
  statusLabel: { fontSize: 18, fontWeight: "600", textAlign: "center", fontFamily: "Poppins-Medium" },
  centerWrapper: {
  flex: 1,
  justifyContent: "center", // centers vertically
  alignItems: "center",     // centers horizontally
  width: "100%",
},
statusWrapper: {
    flex: 1,
    justifyContent: "center", // 👈 vertically centers the section
    alignItems: "center",
  },
flatListContent: {
    paddingTop: 20,
    paddingBottom: 20, // 👈 makes the Start Chat button sit closer
  },

});
