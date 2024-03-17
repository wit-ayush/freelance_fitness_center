import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({
  onClick,
  title,
  textColor,
  colors = ["#4c669f", "#3b5998", "#192f6a"],
  iconSource = null,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        alignSelf: "center",
        width: "100%",
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
          borderColor: "grey",
          borderWidth: 1,
          flexDirection: "row",
        }}
      >
        {iconSource && (
          <Image style={{ marginRight: 20 }} source={iconSource} />
        )}
        <Text
          style={{
            color: textColor,
            fontSize: 18,
            textAlign: "center",
            fontWeight: "600",
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
