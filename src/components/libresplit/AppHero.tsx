import { TextScramble } from "../ui/text-scramble";

export function AppHero() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-bold text-6xl">LibreSplit</p>
      <TextScramble characterSet="_" speed={28}>
        Free speedrun timer with auto splitting and load removal for Linux.
      </TextScramble>
    </div>
  );
}
