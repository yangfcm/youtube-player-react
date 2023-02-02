import Box from "@mui/material/Box";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export function NoContent({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        background: "#eee",
        display: "flex",
        AlignItems: "center",
        justifyContent: "center",
        py: 5,
        PX: 2,
      }}
    >
      <SentimentVeryDissatisfiedIcon />
      &nbsp;
      {children}
    </Box>
  );
}
