import { AppGitHubReadme } from "@/components/libresplit/AppGitHubReadme";
import { AppHero } from "@/components/libresplit/AppHero";

export function Home() {
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <AppHero />
      <AppGitHubReadme />
    </div>
  );
}
