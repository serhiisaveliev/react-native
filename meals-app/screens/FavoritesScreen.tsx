import { FC } from "react";
// import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const FavoritesScreen: FC = () => {
  // const favoriteMealCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state: any) => state.favoriteMeals.ids);

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (!favoriteMeals.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
