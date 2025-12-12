import { useEffect, useState } from "react";

import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";

export function AppGitHubSettingsKeybinds() {
  const [settingsKeybinds, setSettingsKeybinds] =
    useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const urlSettingsKeybinds =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/settings-keybinds.md";

  // Fetch markdown from GitHub page for LibreSplit, place into the readme state.
  useEffect(() => {
    fetch(urlSettingsKeybinds)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.text();
      })
      .then((text) => setSettingsKeybinds(text))
      .catch(() => setSettingsKeybinds("Failed to load README from GitHub."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <div>
      <Markdown content={settingsKeybinds} />
    </div>
  );
}
