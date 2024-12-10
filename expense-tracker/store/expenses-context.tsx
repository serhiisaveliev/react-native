import { ReactNode, createContext, useReducer } from "react";
import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";

type TExpensesContext = {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  addExpense: (expenseData: Partial<IExpense>) => void;
  updateExpense: (id: string, expenseData: Partial<IExpense>) => void;
  deleteExpense: (id: string) => void;
};

export const ExpensesContext = createContext<TExpensesContext>({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }: Partial<IExpense>) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: Partial<IExpense>
  ) => {},
});

function expensesReducer(state: IExpense[], action: any) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense: IExpense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense: IExpense) => expense.id !== action.payload);

    default:
      return state;
  }
}

type TProps = {
  children: ReactNode;
};

function ExpensesContextProvider({ children }: TProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: Partial<IExpense>) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses: IExpense[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id: string, expenseData: Partial<IExpense>) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
