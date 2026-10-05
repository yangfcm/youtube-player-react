import { useState, useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!query.trim()) return;
      navigate(`/search?q=${query}`);
    },
    [query, navigate]
  );

  return (
    <Paper component="form" sx={{ display: "flex" }} onSubmit={handleSearch}>
      <InputBase
        placeholder="Search"
        sx={{
          ml: 1,
          flexGrow: 1,
        }}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
