import { useEffect, useState } from "react";

import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";

export function AppGitHubTroubleshooting() {
  const [troubleshooting, setTroubleshooting] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const urlTroubleshooting =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/troubleshooting.md";

  useEffect(() => {
    fetch(urlTroubleshooting)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.text();
      })
      .then((text) => setTroubleshooting(text))
      .catch(() => setTroubleshooting("Failed to load README from GitHub."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <div>
      <Markdown content={troubleshooting} />
    </div>
  );
}
