import Box from "@mui/material/Box";
import { HEADER_HEIGHT } from "../settings/constant";

export const bannerHeight = "16vw";

export function ChannelBanner({ imageUrl }: { imageUrl?: string }) {
  if (!imageUrl) return null;
  return (
    <Box
      sx={{
        backgroundImage: `url(${imageUrl})`,
        width: "100%",
        height: bannerHeight,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 50%",
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        display: {
          sm: "block",
          xs: "none",
        },
      }}
    ></Box>
  );
}
