import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

const docs = [
  {
    title: "Auto Splitters",
    description:
      "Documentation and tips for creating auto splitters for LibreSplit.",
    to: "/docs/auto-splitters.md",
  },
  {
    title: "Settings and Keybinds",
    description: "Customize controls and behavior.",
    to: "/docs/settings-keybinds.md",
  },
  {
    title: "Split Files",
    description: "JSON split file documentation.",
    to: "/docs/split-files.md",
  },
  {
    title: "Themes",
    description: "Style the app to your liking.",
    to: "/docs/themes.md",
  },
  {
    title: "Troubleshooting",
    description: "Fix common issues and edge cases.",
    to: "/docs/troubleshooting.md",
  },
];

export function Docs() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Documentation</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Link key={doc.to} to={doc.to}>
            <Card className="h-full transition hover:border-primary hover:shadow-lg">
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
