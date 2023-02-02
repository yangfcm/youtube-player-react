import { useParams } from "react-router-dom";

export function Channel() {
  const { id = "" } = useParams();
  console.log(id);
  return <>Channel page</>;
}
