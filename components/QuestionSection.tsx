import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";

const QuestionSection = ({
  question,
  allOptions,
  setSelectedOption,
  option,
  textBox,
  multiLine,
  label,
  placeholder,
  keyboardType,
}: {
  question: string;
  allOptions?: string[];
  setSelectedOption: Function;
  option: string;
  textBox?: boolean;
  multiLine?: boolean;
  label?: string;
  placeholder?: string;
  keyboardType?: string;
}) => {
  const [optionSelected, setoptionSelected] = useState("");

  //   #0086C9
  const OptionComponent = ({ title }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedOption(title);
        }}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
          padding: 15,
          marginTop: 20,
          backgroundColor: option == title ? "purple" : "white",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: option == title ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>
        {question}
      </Text>
      {allOptions &&
        allOptions.length > 0 &&
        allOptions.map((option, i) => {
          return <OptionComponent key={i} title={option} />;
        })}
      {textBox && (
        <View style={{ marginTop: -30 }}>
          <CustomInput
            label={label}
            placeholder={placeholder}
            value={option}
            onChangeText={setSelectedOption}
            multiLine={multiLine}
            type={keyboardType}
            autofocus={true}
          />
        </View>
      )}
    </View>
  );
};

export default QuestionSection;

const styles = StyleSheet.create({});
