export interface ErrorStateProps {
  error: Error | string;
  onRetry?: () => void;
}

export function ErrorState({
  error,
  onRetry
}: ErrorStateProps) {
  const message =
    typeof error === "string"
      ? error
      : error.message;

  return (
    <div
      role="alert"
      className="media-error"
    >
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
}