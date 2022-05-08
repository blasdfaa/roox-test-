import React from "react";
import { UsersSortModeOptions } from "../interfaces/user.interface";

type AppContextState = {
  sortMode: UsersSortModeOptions;
  handleSortMode?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
};

const defaultState: AppContextState = {
  sortMode: "default",
};

export const AppContext = React.createContext<AppContextState>(defaultState);

export const AppContextProvider: React.FC<
  React.PropsWithChildren<Record<never, unknown>>
> = ({ children }) => {
  const [sortMode, setSortMode] = React.useState<UsersSortModeOptions>(
    defaultState.sortMode
  );

  const handleSortMode = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    setSortMode(e.currentTarget.dataset?.sortType as UsersSortModeOptions);
  };

  const contextValue = React.useMemo(
    () => ({
      sortMode,
      handleSortMode,
    }),
    [sortMode]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
