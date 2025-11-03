import { TextScramble } from "../ui/text-scramble";

export function AppHero() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/assets/libresplit.svg"
        alt="LibreSplit"
        className="w-64"
      />
      <p className="text-bold text-6xl">LibreSplit</p>
      <TextScramble characterSet="_" speed={28}>
        Free speedrun timer with auto splitting and load removal for Linux.
      </TextScramble>
    </div>
  );
}
