import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images, sample_recipes } from "../utils/constants";
import MealModal from "./MealModal";
import CustomInput from "./CustomInput";

const Recipies = () => {
  const OptionComponent = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedData(item);
        }}
        style={{
          borderRadius: 10,
          alignSelf: "flex-start",
          marginHorizontal: 3,
          marginTop: 20,
        }}
      >
        <View
          style={{
            height: 200,
            width: 180,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
              borderRadius: 10,
            }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/2276/2276931.png",
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 0,
            width: 180,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
            padding: 8,
            opacity: 0.7,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [mealModal, setMealModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(sample_recipes);

  useEffect(() => {
    if (selectedData) {
      setMealModal(true);
    }
  }, [selectedData]);

  useEffect(() => {
    if (recipeSearch === "") {
      setFilteredRecipes(sample_recipes);
    } else {
      const filtered = sample_recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(recipeSearch.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [recipeSearch]);

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white", flex: 1 }}>
      <MealModal
        modal={mealModal}
        setModal={setMealModal}
        selectedData={selectedData}
        setselectedData={setSelectedData}
      />

      <CustomInput
        label={"Recipe"}
        placeholder={"Enter Recipe"}
        value={recipeSearch}
        onChangeText={setRecipeSearch}
      />

      <View
        style={{
          marginTop: 20,
          alignSelf: "center",
        }}
      >
        <FlatList
          data={filteredRecipes}
          renderItem={({ item }) => <OptionComponent item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>
      {/* <View style={{ height: 200 }} /> */}
    </SafeAreaView>
  );
};

export default Recipies;

const styles = StyleSheet.create({});
