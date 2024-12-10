import { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type TProps = {
  children: ReactNode;
};

const Subtitle: FC<TProps> = ({ children }) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#e2b497",
    textAlign: "center",
  },
  subtitleContainer: {
    padding: 6,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
    marginHorizontal: 12,
    marginVertical: 4,
  },
});
