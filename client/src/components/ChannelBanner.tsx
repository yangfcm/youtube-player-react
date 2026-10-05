import { useState } from "react";
import Box from "@mui/material/Box";
import { HEADER_HEIGHT } from "../settings/constant";

export const bannerHeight = "16vw";

export function ChannelBanner({
  imageUrl,
  onError,
}: {
  imageUrl?: string;
  onError?: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) return null;
  return (
    <>
      <img
        src={imageUrl}
        alt=""
        hidden
        onError={() => {
          setHasError(true);
          onError?.();
        }}
      />
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
    </>
  );
}
