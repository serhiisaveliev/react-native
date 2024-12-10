import { FC, ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import Colors from "../../constants/colors";

type TProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const InstructionText: FC<TProps> = ({ children, style }) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
