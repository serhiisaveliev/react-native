import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng  REAL NOT NULL
        )`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place: Place) {
  const { title, imageUri, address = "", location } = place;
  const { lat = "", lng = "" } = location || {};

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array) {
            const { id, title, imageUri, address, lat, lng } = dp;
            places.push(new Place(title, imageUri, { address, lat, lng }, id));
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id: string) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          const { id, title, imageUri, address, lat, lng } =
            result.rows._array[0];
          const place = new Place(title, imageUri, { address, lat, lng }, id);
          resolve(place);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}
