import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//* Components
import OnboardingFlow from "./src/OnboardingFlow";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <OnboardingFlow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
