import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchVideos } from "../features/video/videoSlice";

export function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchVideos({
        chart: "mostPopular",
      })
    );
  }, [dispatch]);

  return <>Home page</>;
}
