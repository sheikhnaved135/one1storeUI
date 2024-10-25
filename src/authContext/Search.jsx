import { createContext, useContext, useState } from "react";

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [value, setValue] = useState({
    keywords: "",
    results: [],
  });
  return (
    <searchContext.Provider value={[value, setValue]}>
      {children}
    </searchContext.Provider>
  );
};
const useSearch = () => useContext(searchContext);
export { useSearch, SearchProvider };
