// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Alert,
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// const OtpVerificationScreen = ({navigation}) => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [timer, setTimer] = useState(30);
//   const otpRefs = useRef([]);

//   // Countdown for resend OTP
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => setTimer(timer - 1), 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   const handleChange = (text, index) => {
//     if (text.length > 1) return;
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     // Auto-focus next input if a digit is entered
//     if (text && index < 3) {
//       otpRefs.current[index + 1]?.focus();
//     } 
//     // Auto-focus previous input if backspace is pressed (text is empty)
//     else if (!text && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleResend = () => {
//     setTimer(30);
//   };

//   const handleVerify = () => {
//     const isOtpComplete = otp.every(digit => digit !== '');
//     if (!isOtpComplete) {
//       Alert.alert('Validation Error', 'Please enter the complete OTP.');
//       return;
//     }
//     navigation.navigate("TabNavigator");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
//           {/* Top Image Section */}
//           <View style={styles.imageContainer}>
//             <ImageBackground
//               source={require("../assets/curve.png")} // replace with your jewellery bg
//               style={styles.image}
//               resizeMode="cover"
//             />
//           </View>

//           {/* OTP Card */}
//           <View style={styles.waveContainer}>
//             <View style={styles.card}>
//               <Text style={[styles.title,{alignSelf:"flex-start"}]}>Verification</Text>
//               <Text style={[styles.subtitle,{alignSelf:"flex-start"}]}>
//                 Enter the OTP sent to your phone number 8******12
//               </Text>

//               {/* OTP Input Boxes */}
//               <View style={styles.otpContainer}>
//                 {otp.map((digit, index) => (
//                   <TextInput
//                     key={index}
//                     ref={(input) => { otpRefs.current[index] = input; }}
//                     style={styles.otpBox}
//                     keyboardType="number-pad"
//                     maxLength={1}
//                     value={digit}
//                     onChangeText={(text) => handleChange(text, index)}
//                   />
//                 ))}
//               </View>

//               {/* Resend Section */}
//               <View style={styles.resendContainer}>
//                 <Text style={styles.resendText}>
//                   Resend OTP in {timer}s
//                 </Text>
//                 {timer === 0 && (
//                   <TouchableOpacity onPress={handleResend}>
//                     <Text style={styles.resendLink}>Resend OTP</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>

//               {/* Verify Button */}
//               <TouchableOpacity style={styles.button} onPress={handleVerify} >
//                 <Text style={styles.buttonText}>Verify</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default OtpVerificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   imageContainer: {
//     height: height * 0.45,
//     width: "100%",
//     overflow: "hidden",
//   },
//   image: {
//     height: "100%",
//     width: "100%",
//   },
//   waveContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   card: {
//     width: width * 0.9,
//     // backgroundColor: "rgba(125, 214, 192, 0.25)", // translucent mint green
//     borderRadius: 25,
//     paddingVertical: 40,
//     paddingHorizontal: 25,
//     alignItems: "center",
//     borderWidth:1,
//     borderColor:"#0D6B4E",
//     marginTop:5
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#000",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#444",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginBottom: 25,
//   },
//   otpBox: {
//     width: 50,
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#4B8B6A",
//     borderRadius: 8,
//     textAlign: "center",
//     fontSize: 18,
//     color: "#000",
//     backgroundColor: "#fff",
//   },
//   resendContainer: {
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   resendText: {
//     color: "#333",
//     fontSize: 13,
//   },
//   resendLink: {
//     color: "#0D6B4E",
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 5,
//     textDecorationLine: "underline",
//   },
//   button: {
//     backgroundColor: "#0D6B4E",
//     borderRadius: 6,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     paddingVertical: 14,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
// });
import React, { useState, useEffect, useRef } from "react";
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
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";

const { width, height } = Dimensions.get("window");

const OtpVerificationScreen = ({navigation}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const otpRefs = useRef([]);

  // Countdown for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if a digit is entered
    if (text && index < 3) {
      otpRefs.current[index + 1]?.focus();
    } 
    // Auto-focus previous input if backspace is pressed (text is empty)
    else if (!text && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
  };

  const handleVerify = () => {
    const isOtpComplete = otp.every(digit => digit !== '');
    if (!isOtpComplete) {
      Keyboard.dismiss();
      Alert.alert('Validation Error', 'Please enter the complete OTP.');
      return;
    }
    Keyboard.dismiss();
    navigation.navigate("TabNavigator");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

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
          {/* Top Image Section */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../assets/curve.png")} // replace with your jewellery bg
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* OTP Card */}
          <View style={styles.waveContainer}>
            <View style={styles.card}>
              <Text style={[styles.title,{alignSelf:"flex-start"}]}>Verification</Text>
              <Text style={[styles.subtitle,{alignSelf:"flex-start"}]}>
                Enter the OTP sent to your phone number 8******12
              </Text>

              {/* OTP Input Boxes */}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => { otpRefs.current[index] = input; }}
                    style={styles.otpBox}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                  />
                ))}
              </View>

              {/* Resend Section */}
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Resend OTP in {timer}s
                </Text>
                {timer === 0 && (
                  <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Verify Button */}
              <TouchableOpacity style={styles.button} onPress={handleVerify} >
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
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
  card: {
    width: width * 0.9,
    // backgroundColor: "rgba(125, 214, 192, 0.25)", // translucent mint green
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    borderWidth:1,
    borderColor:"#0D6B4E",
    marginTop:5
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 25,
  },
  otpBox: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: "#4B8B6A",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    backgroundColor: "#fff",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  resendText: {
    color: "#333",
    fontSize: 13,
  },
  resendLink: {
    color: "#0D6B4E",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#0D6B4E",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});