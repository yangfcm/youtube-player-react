import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

Enzyme.configure({
  adapter: new Adapter(),
});

library.add(fas); // Config fontawesome
