import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export function NoContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          AlignItems: "center",
          justifyContent: "center",
          mt: 4,
          mb: 1,
          px: 2,
        }}
      >
        <SentimentVeryDissatisfiedIcon />
        &nbsp;
        {children}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MuiLink component={Link} to="/">
          Back to Home
        </MuiLink>
      </Box>
    </>
  );
}
