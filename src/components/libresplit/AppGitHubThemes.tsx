import { useEffect, useState } from "react";

import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";

export function AppGitHubThemes() {
  const [themes, setThemes] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const urlThemes =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/themes.md";

  useEffect(() => {
    fetch(urlThemes)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.text();
      })
      .then((text) => setThemes(text))
      .catch(() => setThemes("Failed to load README from GitHub."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <div>
      <Markdown content={themes} />
    </div>
  );
}
