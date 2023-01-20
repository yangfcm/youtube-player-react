import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  return (
    <Paper component="form" sx={{ mr: { xs: 0, sm: 1 } }}>
      <InputBase
        placeholder="Search"
        sx={{
          ml: 1,
          width: {
            xs: "130px",
            sm: "auto",
            xl: "300px",
          },
        }}
      />
      <IconButton type="button">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
