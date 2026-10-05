export enum AsyncStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAIL = "fail",
  SUCCESS = "success",
}

export type GapiLoadError = {
  details: string;
  error: string;
};
