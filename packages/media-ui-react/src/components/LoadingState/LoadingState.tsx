export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Loading media..."
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="media-loading"
    >
      {message}
    </div>
  );
}