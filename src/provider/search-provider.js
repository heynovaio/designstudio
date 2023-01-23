import React, { createContext, useState, useMemo } from 'react';

export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
	const [isSearched, setIsSearched] = useState(false);
	const value = useMemo(() => ({ isSearched, setIsSearched }), [
		isSearched,
		setIsSearched,
	]);

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
};

export default SearchProvider;
