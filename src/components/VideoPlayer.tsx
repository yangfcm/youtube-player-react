import Box from "@mui/material/Box";

export function VideoPlayer({ videoId }: { videoId: string }) {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "100%",
        height: "0",
        overflow: "hidden",
        background: "#dcddde",
        paddingBottom: {
          xl: '45%',
          md: '70%',
          xs: '75%',
        },
        mb: 1,
      }}
    >
      <iframe
        src={videoSrc}
        title="video player"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      ></iframe>
    </Box>
  );
}
