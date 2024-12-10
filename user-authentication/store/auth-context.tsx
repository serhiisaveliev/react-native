import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useEffect, useState } from "react";

type TAuthContext = {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext>({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

type TProps = {
  children: ReactNode;
};

function AuthContextProvider({ children }: TProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;
    if (authToken) {
      const oneHour = 36000000;
      logoutTimer = setTimeout(logout, oneHour);
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [authToken]);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
