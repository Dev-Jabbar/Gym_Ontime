/**
 * Uploads a file directly to Cloudinary using the signed-upload flow:
 * 1. Ask our backend for a signature (proves the request is authorized
 *    by us, without ever exposing the Cloudinary API secret to the browser).
 * 2. Upload straight to Cloudinary's API using that signature.
 * 3. Return the resulting secure URL for the caller to save wherever
 *    it needs to (e.g. as a profile's avatar field).
 *
 * This does NOT touch our own backend for the actual file bytes —
 * only for the signature. Keeps our server load light and avoids
 * needing multer or any file-handling middleware there at all.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  // Step 1: get a signature scoped to this upload attempt.
  const signatureRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/uploads/signature`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!signatureRes.ok) {
    throw new Error("Unable to get upload permission. Please try again.");
  }

  const { signature, timestamp, folder, apiKey, cloudName } =
    await signatureRes.json();

  // Step 2: upload directly to Cloudinary. Every field sent here that
  // was part of what the backend signed MUST match exactly — folder,
  // timestamp — or Cloudinary rejects it as a signature mismatch.
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!uploadRes.ok) {
    const errorData = await uploadRes.json().catch(() => null);
    throw new Error(
      errorData?.error?.message || "Image upload failed. Please try again.",
    );
  }

  const data = await uploadRes.json();
  return data.secure_url as string;
}

/**
 * Basic client-side validation before even attempting an upload —
 * catches obvious mistakes fast without a round trip to the server.
 * The backend/Cloudinary side should still enforce this too; this is
 * just for a quicker, friendlier error message in the UI.
 */
export function validateImageFile(file: File): string | null {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeBytes = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return "Please upload a JPG, PNG, or WEBP image.";
  }

  if (file.size > maxSizeBytes) {
    return "Image must be smaller than 5MB.";
  }

  return null;
}
