import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TProps = {
  text: string;
  onItemDelete: (id: string) => void;
  id: string;
};

const GoalItem: FC<TProps> = (props) => (
  <View style={styles.goalItem}>
    <Pressable
      android_ripple={{ color: "#210644" }}
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={props.onItemDelete.bind(this, props.id)}
    >
      <Text style={styles.goalText}>{props.text}</Text>
    </Pressable>
  </View>
);

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    padding: 8,
    color: "#fff",
  },
});
