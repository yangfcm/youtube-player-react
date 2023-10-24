import { render } from "@testing-library/react";
import '../__mocks__/intersectionObserverMock';
import App from '../App';

test("Sidebar is rendered properly", () => {
  render(<App />);
});
