import React, { useState } from "react";

import AppFileSelect from "@/components/libresplit/AppFileSelect";
import init, { convert } from "@libresplit/libresplit-converter";
import wasmUrl from "@libresplit/libresplit-converter/libresplit_converter_bg.wasm?url";

export function Converter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
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
    <div>
      <AppFileSelect />
    </div>
  );
}
