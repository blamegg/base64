"use client";
import React, { useState } from "react";
import styles from "./FileToBase64Converter.module.scss";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaRegCopy,
} from "react-icons/fa";

const FileToBase64Converter = () => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    setFileType(file.type);

    reader.onloadend = () => {
      setBase64(reader.result);
      setError("");

      if (file.type.startsWith("image/")) {
        setPreview(
          <img
            src={reader.result}
            alt="Preview"
            className={styles.previewImage}
          />
        );
      } else if (file.type === "application/pdf") {
        setPreview(
          <iframe
            src={reader.result}
            className={styles.pdfPreview}
            title="PDF Preview"
          />
        );
      } else if (file.type.startsWith("text/") || file.name.endsWith(".json")) {
        setPreview(
          <textarea
            className={styles.textPreview}
            value={reader.result}
            readOnly
          />
        );
      } else {
        setPreview(<p className={styles.unsupported}>Preview not available</p>);
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
      <header className={styles.header}>Base64 Converter</header>

      <main className={styles.container}>
        <div className={styles.converterGrid}>
          {/* Left Section: File Input & Output */}
          <div className={styles.leftSection}>
            <h1 className={styles.title}>Convert File to Base64</h1>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.input}
              accept="image/*, .txt, .pdf, .json"
            />
            {error && <p className={styles.errorMessage}>{error}</p>}

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

          {/* Right Section: Preview */}
          <div className={styles.rightSection}>
            <h3 className={styles.previewTitle}>File Preview:</h3>
            {preview || (
              <p className={styles.noPreview}>No Preview Available</p>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Base64 Converter | All Rights Reserved
        </p>
        <div className={styles.socialIcons}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FileToBase64Converter;
