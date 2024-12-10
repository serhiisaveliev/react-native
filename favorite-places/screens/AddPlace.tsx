import { FC } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { insertPlace } from "../util/database";

const AddPlace: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  async function createPlaceHandler(place: Place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
