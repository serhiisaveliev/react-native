import { FC } from "react";
import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { IExpense } from "./ExpensesOutput";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: ListRenderItemInfo<IExpense>) {
  return <ExpenseItem {...itemData.item} />;
}

type TProps = {
  expenses: IExpense[];
};

const ExpensesList: FC<TProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
