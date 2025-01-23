"use client";
import React, { useState } from "react";
import styles from "./FileToBase64Converter.module.scss";
import { FaRegCopy } from "react-icons/fa";

const FileToBase64Converter = () => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
      setError("");

      // Check if the file is an image and set preview
      if (file.type.startsWith("image/")) {
        setImagePreview(reader.result);
      } else {
        setImagePreview(null);
      }
    };

    reader.onerror = () => {
      setError("Failed to convert file to Base64");
    };

    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>Base64 Converter</header>

      <main className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Convert File to Base64</h1>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.input}
            accept="image/*, .txt, .pdf, .json"
          />

          {error && <p className={styles.errorMessage}>{error}</p>}

          {/* Image Preview Section */}
          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <h3 className={styles.previewTitle}>Image Preview:</h3>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          )}

          {base64 && (
            <div className={styles.outputContainer}>
              <h3 className={styles.outputTitle}>Base64 Output:</h3>
              <textarea className={styles.textarea} value={base64} readOnly />

              <button onClick={handleCopy} className={styles.copyButton}>
                <FaRegCopy className={styles.copyIcon} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Base64 Converter
      </footer>
    </div>
  );
};

export default FileToBase64Converter;
