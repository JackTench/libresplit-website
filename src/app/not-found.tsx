import { PacmanLoader } from "react-spinners";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <PacmanLoader color="#2196f3" />
      <p>Not found.</p>
    </div>
  );
}
