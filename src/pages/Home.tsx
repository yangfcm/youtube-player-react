import { useMostPopularVideos } from "../features/video/useMostPopularVideos";

export function Home() {
  const { mostPopularVideos, status, error, fetchMore } =
    useMostPopularVideos();

  return (
    <>
      Home page
      {mostPopularVideos &&
        mostPopularVideos.map((video) => {
          return <div>{video.snippet.title}</div>;
        })}
      <button onClick={fetchMore}>More</button>
    </>
  );
}
