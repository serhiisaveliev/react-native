import axios from "axios";
import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";

const BACKEND_URL =
  "https://react-native-course-a3ec7-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: Partial<IExpense>) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;

  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const { amount, date, description } = response.data[key];
    const expenseObj = {
      id: key,
      amount,
      date: new Date(date),
      description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: Partial<IExpense>) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
