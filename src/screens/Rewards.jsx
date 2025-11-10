import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

const Rewards = () => {
  const data = [
    {
      title: "Gold",
      icon: require("../assets/gold.png"),
      items: [
        { label: "Pure Gold", value: "₹11,400/g" },
        { label: "Rose Gold", value: "₹10,190/g" },
      ],
    },
    {
      title: "Silver",
      icon: require("../assets/silver.png"),
      items: [{ label: "Silver", value: "₹110/g" }],
    },
    {
      title: "Platinum",
      icon: require("../assets/platinum.png"),
      items: [{ label: "Platinum", value: "₹3,400 / gram" }],
    },
    {
      title: "Diamond",
      icon: require("../assets/diomand.png"),
      items: [{ label: "Diamond", value: "₹1,00,000 / carat" }],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#00A982", "#00C18A"]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Today's Rate</Text>
        </LinearGradient>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {data.map((category, index) => (
          <LinearGradient
            key={index}
            colors={["#00A982", "#00C18A"]}
            style={styles.cardContainer}
          >
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <Image source={category.icon} style={styles.icon} />
                <Text style={styles.cardTitle}>{category.title}</Text>
              </View>
              <Text style={styles.star}>✨</Text>
            </View>

            {category.items.map((item, i) => (
              <View key={i} style={styles.rateRow}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemValue}>{item.value}</Text>
              </View>
            ))}
          </LinearGradient>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    height: height * 0.16,
    overflow: "hidden",
  },
  headerGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: "#fff",
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 15,
    paddingBottom: 40,
    marginTop: -height * 0.01, // slight overlap effect like in your image
  },
  cardContainer: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: "contain",
    marginRight: 8,
  },
  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#fff",
  },
  star: {
    fontSize: width * 0.05,
    color: "#fff",
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: width * 0.038,
    color: "#333",
    fontWeight: "500",
  },
  itemValue: {
    fontSize: width * 0.038,
    color: "#000",
    fontWeight: "600",
  },
});

export default Rewards;
