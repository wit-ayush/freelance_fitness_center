import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MyMeals = () => {
  const MacrosBox = ({ text, data }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 14 }}>{text}</Text>
        <Text style={{ fontWeight: "bold" }}>{data}gm</Text>
      </View>
    );
  };

  const FoodBox = ({ mealType }) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 30,
          marginHorizontal: 20,
        }}
      >
        <Image
          style={{ borderRadius: 10, opacity: 0.9, position: "relative" }}
          height={100}
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=3038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            marginTop: 2,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginLeft: 10,
              color: "#5A5A5A",
            }}
          >
            {mealType}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          marginTop: 30,
          marginLeft: 20,
          fontWeight: "bold",
        }}
      >
        Your Macros Target
      </Text>

      <View
        style={{
          alignSelf: "center",
          width: "80%",
          marginTop: 9,
          borderWidth: 0.5,
          borderColor: "gray",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <MacrosBox text={"Protein"} data={100} />
          <View style={styles.verticalLine} />
          <MacrosBox text={"Carbs"} data={100} />
          <View style={styles.verticalLine} />

          <MacrosBox text={"Fats"} data={100} />
        </View>
      </View>
      <FoodBox mealType={"Breakfast"} />
      <FoodBox mealType={"Lunch"} />
      <FoodBox mealType={"Dinner"} />
    </View>
  );
};

export default MyMeals;

const styles = StyleSheet.create({
  verticalLine: {
    height: "100%",
    width: 0.9,
    backgroundColor: "gray",
  },
});
