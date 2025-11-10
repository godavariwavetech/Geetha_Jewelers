import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignInScreen = ({navigation}) => {
  const [phone, setPhone] = useState("");

  const handleRequestOTP = () => {
    if (phone.length !== 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
    navigation.navigate("OTPVerification");
  };

  const handlePhoneChange = (text) => {
    // Allow only digits
    const numericText = text.replace(/[^0-9]/g, '');
    setPhone(numericText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* ✅ Keyboard Avoid + Scroll */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({
          ios: "padding",
          android: "padding",
          default: "padding"
        })}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../assets/curve.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Card Box */}
          <View style={styles.waveContainer}>
            <View style={styles.signInBox}>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>
                Please enter your phone number to continue
              </Text>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#777"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  maxLength={10}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleRequestOTP}>
                <Text style={styles.buttonText}>Request OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40, // Minimal padding to ensure button is not cut off
  },
  imageContainer: {
    height: height * 0.45,
    width: "100%",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  waveContainer: {
    flex: 1,
    alignItems: "center",
  },
  signInBox: {
    width: width * 0.9,
    // backgroundColor: "rgba(125, 214, 192, 0.3)",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth:1,
    borderColor:"#0D6B4E",
    marginTop:5
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4B8B6A",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: "#000",
  },
  button: {
    backgroundColor: "#0D6B4E",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});