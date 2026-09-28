import { useCallback, useEffect, useState } from "react";
import { api, clearAuthToken, getAuthToken, setAuthToken } from "../services/api";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAuthToken()));
  const [authError, setAuthError] = useState("");

  const logout = useCallback(() => {
    clearAuthToken();
    setUser(null);
    setAuthError("");
  }, []);

  const verifySession = useCallback(async () => {
    if (!getAuthToken()) {
      setUser(null);
      return null;
    }

    setIsLoading(true);
    setAuthError("");
    try {
      const currentUser = await api.get("/auth/me");
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      if (error.status === 401) {
        clearAuthToken();
        setUser(null);
      } else {
        console.error("Unable to restore the authenticated session:", error);
        setAuthError(error.message);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = window.setTimeout(() => {
      if (isMounted && getAuthToken()) verifySession();
    }, 0);
    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [verifySession]);

  const authenticate = async (path, credentials) => {
    const result = await api.post(path, credentials);
    if (!result?.token || !result.user) {
      throw new Error("The authentication response is missing a token or user.");
    }
    setAuthToken(result.token);
    setUser(result.user);
    setAuthError("");
    return result.user;
  };

  const login = (credentials) => authenticate("/auth/login", credentials);
  const signup = (details) => authenticate("/auth/signup", details);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authError,
        login,
        signup,
        logout,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
