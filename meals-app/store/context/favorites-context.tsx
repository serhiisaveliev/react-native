import { ReactNode, createContext, useState } from "react";

type TFavoritesContext = {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<TFavoritesContext>({
  ids: [],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {},
});

type TProps = {
  children: ReactNode;
};

function FavoritesContextProvider({ children }: TProps) {
  const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteMealIds((currentFavIds: string[]) => [...currentFavIds, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteMealIds((currentFavIds: string[]) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
