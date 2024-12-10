import { useState } from "react";
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

type TGoal = { text: string; id: string };

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState<TGoal[]>([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function cancelAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText: string) {
    setCourseGoals((currentCourseGoals: TGoal[]) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    cancelAddGoalHandler();
  }

  function removeGoalHandler(id: string) {
    setCourseGoals((currentCourseGoals: TGoal[]) =>
      currentCourseGoals.filter((goal: TGoal) => goal.id !== id)
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={cancelAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={(itemData: ListRenderItemInfo<TGoal>) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onItemDelete={removeGoalHandler}
                />
              );
            }}
            keyExtractor={(item: TGoal, key: number) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
