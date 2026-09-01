import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [tasks, setTasks] = useState({
    app: false,
    auth: false,
    fonts: false,
  });

  const [hasShownSplash, setHasShownSplash] = useState(() => {
    return sessionStorage.getItem("blume-splash") === "true";
  });

  const completeTask = useCallback((task) => {
    setTasks((prev) => {
      if (prev[task]) {
        return prev;
      }

      return {
        ...prev,
        [task]: true,
      };
    });
  }, []);

  const loading = useMemo(() => {
    return !Object.values(tasks).every(Boolean);
  }, [tasks]);

  useEffect(() => {
    if (!loading && !hasShownSplash) {
      sessionStorage.setItem("blume-splash", "true");
      setHasShownSplash(true);
    }
  }, [loading, hasShownSplash]);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        hasShownSplash,
        tasks,
        completeTask,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
