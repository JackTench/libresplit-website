import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { GithubButton } from "../ui/github-button";
import { AppLoading } from "./AppLoading";
import { Github } from "lucide-react";

export function AppGitHubButton() {
  const [stars, setStars] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch repo data from GitHub API.
  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/LibreSplit/LibreSplit",
          {
            headers: { Accept: "application/vnd.github+json" },
          },
        );

        if (!response.ok)
          throw new Error(`GitHub API error: ${response.status}`);

        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchStars();
  }, []);

  // Show whilst API request loads.
  if (stars == null) {
    return <AppLoading />;
  }

  // Show in the case of an error.
  if (error) {
    return (
      <Button>
        <a href="https://github.com/LibreSplit/LibreSplit">
          <Github />
        </a>
      </Button>
    );
  }

  // Show full component.
  return (
    <GithubButton
      repoUrl="https://github.com/LibreSplit/LibreSplit"
      label="GitHub"
      initialStars={0}
      targetStars={stars}
    />
  );
}
