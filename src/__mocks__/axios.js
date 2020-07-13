const mockAxios = jest.genMockFromModule("axios");
import { apiBaseUrl } from "../settings";

mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
