// utils/downloadFile.ts
export async function downloadFile(url: string, filename?: string) {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`);

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename ?? url.split("/").pop() ?? "download";
    document.body.appendChild(link);
    link.click();
    link.remove();
    // free memory after a short delay
    setTimeout(() => URL.revokeObjectURL(link.href), 5000);
    return true;
  } catch (err) {
    console.error("Download failed:", err);
    return false;
  }
}
