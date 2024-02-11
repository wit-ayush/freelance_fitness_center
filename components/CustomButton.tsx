import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({ onClick, title, textColor, colors }) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "center",
        width: "100%",
        borderColor: "#fff",
      }}
      onPress={onClick}
    >
      <LinearGradient
        colors={colors}
        style={{
          padding: 12,
          marginTop: 20,
          justifyContent: "center",
          width: "90%",
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
