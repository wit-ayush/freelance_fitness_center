import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const CustomInput = ({
  autofocus = false,
  label,
  placeholder,
  value,
  onChangeText,
  multiLine = false,
  type = "default",
}) => {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ marginLeft: 12, marginBottom: 10, fontSize: 15 }}>
        {label}
      </Text>
      <View
        style={{
          borderColor: "#D0D5DD",
          borderWidth: 2.7,
          padding: 10,
          borderRadius: 10,
          height: multiLine ? 100 : 50,
          justifyContent: "center",
          marginHorizontal: 10,
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#667085"}
          style={{ flex: 1 }}
          onChangeText={onChangeText}
          value={value}
          multiline={multiLine}
          keyboardType={type}
          autoFocus={autofocus}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
