// src/components/ResumeButton.tsx
import React from "react";
import { Download } from "lucide-react";
import { downloadFile } from "../utils/downloadFile";

const ResumeButton: React.FC<{ className?: string }> = ({ className = "btn-outline" }) => {
  const base = import.meta.env.BASE_URL ?? "/"; // Vite-provided base
  const url = `${base}Reo_Resume.pdf`; // ensure file is public/Reo_Resume.pdf

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    const ok = await downloadFile(url, "Reo_Resume.pdf");
    if (!ok) {
      // fallback: open in new tab if blob download fails
      window.open(url, "_blank", "noopener");
    }
  };

  return (
    <button onClick={handleDownload} className={className} type="button" aria-label="Download resume">
      <Download size={18} /> Download Resume
    </button>
  );
};

export default ResumeButton;
