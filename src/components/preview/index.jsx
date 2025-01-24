import React from "react";
import styles from "../FileToBase64Converter/FileToBase64Converter.module.scss";

const Preview = ({ previewData, fileType }) => {
  if (!previewData) {
    return <p className={styles.noPreview}>No Preview Available</p>;
  }

  if (fileType.startsWith("image/")) {
    return (
      <img src={previewData} alt="Preview" className={styles.previewImage} />
    );
  }

  if (fileType === "application/pdf") {
    return (
      <iframe
        src={previewData}
        className={styles.pdfPreview}
        title="PDF Preview"
      />
    );
  }

  if (fileType.startsWith("text/") || fileType.endsWith("/json")) {
    return (
      <textarea className={styles.textPreview} value={previewData} readOnly />
    );
  }

  return <p className={styles.unsupported}>Preview not available</p>;
};

export default Preview;
