import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";
import { useQuery } from "@tanstack/react-query";

async function fetchMarkdown(url: string): Promise<string> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch markdown from GitHub.");
  }

  return res.text();
}

type AppGitHubGenericMarkdownProps = {
  url: string;
};

export function AppGitHubGenericMarkdown({
  url,
}: AppGitHubGenericMarkdownProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["markdown-text"],
    queryFn: () => fetchMarkdown(url),
    enabled: !!url,
  });

  if (isLoading) return <AppLoading />;
  if (error) return <div>Failed to fetch markdown from GitHub.</div>;
  if (!data) return <div>Failed to fetch markdown from GitHub.</div>;

  return (
    <div>
      <Markdown content={data} />
    </div>
  );
}
