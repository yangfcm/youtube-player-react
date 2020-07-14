const mockAxios = jest.genMockFromModule("axios");

mockAxios.create = jest.fn(() => mockAxios);
mockAxios.defaults = {
  ...mockAxios.defaults,
  baseURL: "https://www.googleapis.com/youtube/v3",
  timeout: 10000,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
};

export default mockAxios;
