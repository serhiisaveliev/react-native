import { FC, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { fetchPlaceDetails } from "../util/database";
import { Place } from "../models/place";

const PlaceDetails: FC = () => {
  const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, "PlaceDetails">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = (await fetchPlaceDetails(selectedPlaceId)) as Place;
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  function showOnMapHandler() {
    if (fetchedPlace && fetchedPlace.location) {
      navigation.navigate("Map", {
        initialLat: fetchedPlace.location.lat,
        initialLng: fetchedPlace.location.lng,
      });
    }
  }

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data ...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: fetchedPlace.imageUri || "" }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
