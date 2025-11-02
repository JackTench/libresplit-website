import { useMemo, useRef } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppFileSelectProps {
  label?: string;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  multiple?: boolean;
  filters?: { name: string; extensions: string[] }[];
}

export default function AppFileSelect({
  label = "Select file:",
  value,
  onChange,
  multiple = false,
  filters,
}: AppFileSelectProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const display = useMemo(() => {
    if (!value) return "No file chosen.";
    if (Array.isArray(value)) {
      return value.map((f) => f.name).join(", ");
    }
    return value.name;
  }, [value]);

  const handlePick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onChange(null);
      return;
    }

    if (multiple) {
      onChange(Array.from(files));
    } else {
      onChange(files[0]);
    }
  };

  const accept = filters
    ? filters.flatMap((f) => f.extensions.map((ext) => `.${ext}`)).join(",")
    : undefined;

  return (
    <div className="space-y-2 px-8">
      <span className="text-white">{label}</span>
      <div className="flex items-center">
        <Input className="flex-1 rounded-r-none" value={display} readOnly />
        <Button
          type="button"
          onClick={handlePick}
          className="rounded-l-none bg-gray-200 text-black hover:bg-blue-200"
        >
          Open
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
}
