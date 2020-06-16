import React from "react";
import SearchItem from "./SearchItem";

const SearchResultList = ({ searchResultList }) => {
  return (
    <div>
      {searchResultList.map((result, index) => {
        return <SearchItem key={index} item={result} />;
      })}
    </div>
  );
};

export default SearchResultList;
