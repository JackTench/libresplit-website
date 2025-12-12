import { useEffect, useState } from "react";

import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";

export function AppGitHubSplitFiles() {
  const [splitFiles, setSplitFiles] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const urlSplitFiles =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/split-files.md";

  useEffect(() => {
    fetch(urlSplitFiles)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.text();
      })
      .then((text) => setSplitFiles(text))
      .catch(() => setSplitFiles("Failed to load README from GitHub."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <div>
      <Markdown content={splitFiles} />
    </div>
  );
}
