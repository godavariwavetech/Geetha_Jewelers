import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");
const MODAL_WIDTH = width * 0.9;

const WelcomeModal = ({
  visible,
  onClose,
  onExplore,
  title,
  subtitle,
  imageSource,
  buttonText,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            { paddingBottom: insets.bottom +10 },
          ]}
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          {/* Content */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Illustration */}
          <Image
            source={imageSource}
            style={styles.illustration}
            resizeMode="contain"
          />

          {/* Gradient Button */}
          <TouchableOpacity onPress={onExplore} style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#5E61EB", "#262757"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} // changed to horizontal
              style={styles.gradientButton}
            >
              <Text style={styles.exploreButtonText}>{buttonText}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  illustration: {
    width: "100%",
    height: MODAL_WIDTH * 0.5,
    marginVertical: 20,
  },
  buttonWrapper: {
    width: "100%",
  },
  gradientButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  exploreButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
