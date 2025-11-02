import { useState } from "react";

import AppFileSelect from "@/components/libresplit/AppFileSelect";
import { AppSplitPreview } from "@/components/libresplit/AppSplitPreview";
import init, { convert } from "@libresplit/libresplit-converter";
import wasmUrl from "@libresplit/libresplit-converter/libresplit_converter_bg.wasm?url";

export function Converter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileText, setFileText] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSelectChange = async (files: File | File[] | null) => {
    const file = Array.isArray(files) ? (files[0] ?? null) : files;
    setSelectedFile(file);
    setResult(null);
    setFileText(null);

    if (file) {
      const text = await file.text();
      setFileText(text);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file before submitting!");
      return;
    }

    try {
      const text = await selectedFile.text();
      await init(wasmUrl);
      const converted = convert(text);
      setResult(converted);
    } catch (error) {
      console.error("Error processing file: ", error);
      alert("Failed to process file. See console for details.");
    }
  };

  const handleDownload = () => {
    if (!result || !selectedFile) return;

    const fileName = selectedFile.name.replace(/\.[^/.]+$/, ".json");
    const blob = new Blob([result], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-[calc(100vh-64px-24px)] flex-col space-y-4 overflow-hidden">
      <div className="shrink-0 px-[100px]">
        <AppFileSelect
          label="Select LiveSplit file:"
          value={selectedFile}
          onChange={handleSelectChange}
          multiple={false}
          filters={[{ name: "LiveSplit (.lss)", extensions: ["lss", "xml"] }]}
        />
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Convert
        </button>
        <button
          onClick={handleDownload}
          disabled={!result}
          className="rounded bg-gray-200 px-4 py-2 text-black disabled:opacity-50"
        >
          Download Splits
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <div className="flex h-full min-h-0 w-full items-stretch justify-center gap-4">
          {fileText && (
            <div className="flex min-h-0 flex-1 flex-col">
              <span className="mb-2 text-center font-semibold">LiveSplit:</span>
              <AppSplitPreview text={fileText} className="h-full flex-1" />
            </div>
          )}
          {result && (
            <div className="flex min-h-0 flex-1 flex-col">
              <span className="mb-2 text-center font-semibold">
                LibreSplit:
              </span>
              <AppSplitPreview text={result} className="h-full flex-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
