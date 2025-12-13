import { AppGitHubGenericMarkdown } from "@/components/libresplit/AppGitHubGenericMarkdown";

export function Themes() {
  return (
    <div>
      <AppGitHubGenericMarkdown url="https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/themes.md" />
    </div>
  );
}
