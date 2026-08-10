export type MediaSdkErrorCode =
  | "AUTH_ERROR"
  | "API_ERROR"
  | "NETWORK_ERROR"
  | "VALIDATION_ERROR"
  | "UNKNOWN_ERROR";

export class MediaSdkError extends Error {
  readonly code: MediaSdkErrorCode;
  readonly status?: number;

  constructor(
    message: string,
    code: MediaSdkErrorCode = "UNKNOWN_ERROR",
    status?: number
  ) {
    super(message);

    this.name = "MediaSdkError";
    this.code = code;
    this.status = status;
  }
}