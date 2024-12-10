import { FC } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

export type TTextInputConfig = {
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  onChangeText?: (enteredAmount: string) => void;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
};

type TInputStyles = {
  backgroundColor: string;
  color: string;
  padding: number;
  borderRadius: number;
  fontSize: number;
};

type TProps = {
  label: string;
  invalid: boolean;
  textInputConfig?: TTextInputConfig;
  style?: ViewStyle;
};

const Input: FC<TProps> = ({ label, textInputConfig, style, invalid }) => {
  const inputStyles: any = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
