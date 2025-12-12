import { AppGitHubGenericMarkdown } from "@/components/libresplit/AppGitHubGenericMarkdown";
import { AppHero } from "@/components/libresplit/AppHero";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AppHero />
      <AppGitHubGenericMarkdown url="https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/README.md" />
    </div>
  );
}
