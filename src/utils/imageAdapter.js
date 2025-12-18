export function pickImageFile() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });
}

export function uploadImage(file) {
  // MVP: base64
  if (!file.type.startsWith("image/")) {
    throw new Error("Not an image");
  }

  const MAX_SIZE = 700 * 1024; // 700 KB
  if (file.size > MAX_SIZE) {
    throw new Error("Image too large (max 700KB)");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
