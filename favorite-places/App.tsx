import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: {
    pickedLat: number;
    pickedLng: number;
  };
  Map:
    | {
        initialLat: number;
        initialLng: number;
      }
    | undefined;
  PlaceDetails: {
    placeId: string;
  };
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
        SplashScreen.hideAsync();
      })
      .catch((error) => console.log(error));
  }, []);

  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading Place ...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
