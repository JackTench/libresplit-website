import { AppGitHubGenericMarkdown } from "@/components/libresplit/AppGitHubGenericMarkdown";

export function SplitFiles() {
  return (
    <div>
      <AppGitHubGenericMarkdown url="https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/docs/settings-keybinds.md" />
    </div>
  );
}
