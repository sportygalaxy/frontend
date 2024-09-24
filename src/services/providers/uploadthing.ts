// uploadRouter.ts
import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

// Define routes for file uploads (images, PDFs, and videos)
export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Image upload completed:", file.url);
  }),

  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("PDF upload completed:", file.url);
  }),

  videoUploader: f({
    video: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Video upload completed:", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

// Upload function for Uploadthing
export const uploadWithUploadthing = async (
  files: any[]
): Promise<string[] | string> => {
  // Assuming files is the array from the Uploadthing handler
  const uploadedUrls: string[] = files.map((file) => file.url); // Extract URLs from the data

  console.log("PROVIDER ::", { files, uploadedUrls });
  return uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
};
