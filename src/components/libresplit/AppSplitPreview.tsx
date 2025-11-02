interface AppSplitPreviewProps {
  text: string;
  className?: string;
}

export function AppSplitPreview({ text, className }: AppSplitPreviewProps) {
  return (
    <textarea
      readOnly
      value={text}
      wrap="off"
      spellCheck={false}
      aria-readonly="true"
      className={`h-full w-full resize-none ${className ?? ""}`}
    />
  );
}
