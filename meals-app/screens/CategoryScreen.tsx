import { FC } from "react";
import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import Category from "../models/category";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

const CategoryScreen: FC = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  function renderCaregoryItem(itemData: { item: Category }) {
    function onPressCategoryHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={onPressCategoryHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCaregoryItem}
      numColumns={2}
    />
  );
};

export default CategoryScreen;
