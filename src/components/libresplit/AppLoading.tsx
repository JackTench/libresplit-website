import { BarLoader } from "react-spinners";

export function AppLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <BarLoader color={"#2196f3"} />
    </div>
  );
}
