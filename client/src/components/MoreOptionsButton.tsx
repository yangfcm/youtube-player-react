import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type MoreOptionsButtonPropsType = {
  ariaLabel: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export function MoreOptionsButton({
  ariaLabel,
  onClick,
}: MoreOptionsButtonPropsType) {
  return (
    <IconButton
      aria-label={ariaLabel}
      size="small"
      onClick={onClick}
      sx={{
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.2)"
            : "rgba(0,0,0,0.2)",
        "&:hover": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.2)",
        },
      }}
    >
      <MoreVertIcon fontSize="small" />
    </IconButton>
  );
}
