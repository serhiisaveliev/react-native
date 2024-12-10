import { FC, useLayoutEffect } from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MealsOverviewParamList } from "../App";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen: FC = () => {
  const route: RouteProp<MealsOverviewParamList> = useRoute();
  const navigation = useNavigation();
  const catId = route.params?.categoryId;

  const displayedMeals = MEALS.filter((meal: Meal) =>
    meal.categoryIds.includes(catId)
  );

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    )?.title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverviewScreen;
