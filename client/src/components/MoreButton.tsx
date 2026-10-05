import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

type PropsType = {
  loading: boolean;
  children?: React.ReactNode;
  onClick: () => any;
};

export function MoreButton({ children, loading, onClick }: PropsType) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <LoadingButton
        loading={loading}
        variant="outlined"
        size="small"
        onClick={onClick}
        sx={{
          width: {
            xs: "100%",
            md: "50%",
            lg: "40%",
          },
        }}
      >
        {children || "More"}
      </LoadingButton>
    </Box>
  );
}
