import React, { ReactNode, createContext, useContext, useState } from "react";
type searchItemsProps = {
  children: ReactNode;
};
// query is the state
// SearchHandler is a function for changing the state.
type searchContextType = {
  query: string;
  searchHandler: (str: string) => void;
};
const SearchContext = createContext({} as searchContextType);
export const useSearchContext = () => {
  return useContext(SearchContext);
};
// Defining a simple HOC component
const SearchContextProvider = ({ children }: searchItemsProps) => {
  const [query, setQuery] = useState<string>("");

  const searchHandler = (str: string) => {
    setQuery(str);
  };

  return (
    <SearchContext.Provider value={{ query, searchHandler }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
