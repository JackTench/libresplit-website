import { useEffect, useState } from "react";

import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";

export function AppGitHubAutoSplitters() {
  const [autoSplitters, setAutoSplitters] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const urlAutoSplitters =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/auto-splitters.md";

  // Fetch markdown from GitHub page for LibreSplit, place into the readme state.
  useEffect(() => {
    fetch(urlAutoSplitters)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.text();
      })
      .then((text) => setAutoSplitters(text))
      .catch(() => setAutoSplitters("Failed to load README from GitHub."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <div>
      <Markdown content={autoSplitters} />
    </div>
  );
}
