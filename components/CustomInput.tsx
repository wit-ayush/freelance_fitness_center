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
  editable = true,
  mt = 30,
}) => {
  return (
    <View style={{ marginTop: mt }}>
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
          editable={editable}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});

// linear-gradient(to top, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))

// bg-gradient-to-t from-red-200 via-red-300 to-yellow-200
