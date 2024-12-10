import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import Meal from "../../models/meal";
import MealItem from "./MealItem";

type TProps = {
  items: Meal[];
};

function MealsList({ items }: TProps) {
  function renderMealItem(itemData: ListRenderItemInfo<Meal>) {
    const { id, title, imageUrl, duration, complexity, affordability } =
      itemData.item;
    return (
      <MealItem
        id={id}
        title={title}
        imageUrl={imageUrl}
        duration={duration}
        complexity={complexity}
        affordability={affordability}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item: Meal) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
