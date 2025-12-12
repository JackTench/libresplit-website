import { AutoSplitters } from "./app/auto-splitters";
import { Converter } from "./app/converter";
import { Home } from "./app/home";
import { NotFound } from "./app/not-found";
import { SettingsKeybinds } from "./app/settings-keybinds";
import { SplitFiles } from "./app/split-files";
import { Themes } from "./app/themes";
import { Troubleshooting } from "./app/troubleshooting";
import { Route, Routes } from "react-router";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/converter" element={<Converter />} />

      {/* Documentation pages pulled from GitHub. */}
      <Route path="/docs/auto-splitters.md" element={<AutoSplitters />} />
      <Route path="/docs/settings-keybinds.md" element={<SettingsKeybinds />} />
      <Route path="/docs/split-files.md" element={<SplitFiles />} />
      <Route path="/docs/themes.md" element={<Themes />} />
      <Route path="/docs/troubleshooting.md" element={<Troubleshooting />} />

      {/* Fall back on app's 404 page. This is because of the SPA routing trick with 404.html used in GitHub Pages. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
