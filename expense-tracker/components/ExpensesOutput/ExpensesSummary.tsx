import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IExpense } from "./ExpensesOutput";
import { GlobalStyles } from "../../constants/styles";

type TProps = {
  periodName: string;
  expenses: IExpense[];
};

const ExpensesSummary: FC<TProps> = ({ periodName, expenses }) => {
  const expensesSum = expenses.reduce((sum: number, expense: any) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
