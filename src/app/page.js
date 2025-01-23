"use client";
import React, { useState } from "react";

const FileToBase64Converter = () => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
      setError("");
      setCopied(false); // Reset the copied state
    };

    reader.onerror = () => {
      setError("Failed to convert file to Base64");
    };

    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className="file-to-base64-converter">
      <h1>File to Base64 Converter</h1>
      <input type="file" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {base64 && (
        <div>
          <h3>Base64 Output:</h3>
          <textarea
            rows="10"
            cols="50"
            value={base64}
            readOnly
            style={{ width: "100%", marginTop: "10px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleCopy}>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      )}
      {base64 && (
        <>
          <img src={base64} alt="" className="h-28 w-28" />
        </>
      )}
    </div>
  );
};

export default FileToBase64Converter;
