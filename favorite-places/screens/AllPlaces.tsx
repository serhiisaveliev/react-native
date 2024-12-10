import { FC, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../models/place";
// import { RootStackParamList } from "../App";
import { fetchPlaces } from "../util/database";

const AllPlaces: FC = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  // const route = useRoute<RouteProp<RootStackParamList, "AllPlaces">>();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = (await fetchPlaces()) as Place[];
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
