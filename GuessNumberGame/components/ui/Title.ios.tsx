import { FC, ReactNode } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

type TProps = {
  children: ReactNode;
};

const Title: FC<TProps> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
