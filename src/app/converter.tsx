import { useState } from "react";

import AppFileSelect from "@/components/libresplit/AppFileSelect";
import { AppMarkdownCodeBlock } from "@/components/libresplit/AppMarkdownCodeBlock";
import init, { convert } from "@libresplit/libresplit-converter";
import wasmUrl from "@libresplit/libresplit-converter/libresplit_converter_bg.wasm?url";

export function Converter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSelectChange = (files: File | File[] | null) => {
    setSelectedFile(Array.isArray(files) ? (files[0] ?? null) : files);
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
    <div className="space-y-4">
      <AppFileSelect
        label="Select LiveSplit file:"
        value={selectedFile}
        onChange={handleSelectChange}
        multiple={false}
        filters={[{ name: "LiveSplit (.lss)", extensions: ["lss", "xml"] }]}
      />

      <div className="flex gap-2">
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

      {result && <AppMarkdownCodeBlock code={result} language="json" />}
    </div>
  );
}
