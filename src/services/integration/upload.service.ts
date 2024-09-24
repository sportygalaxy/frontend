import { UploadedFile } from "express-fileupload";
import { uploadToCloudinary } from "../providers/cloudinary";
import { uploadWithMulter } from "../providers/multer";
import { uploadToS3 } from "../providers/s3";
import { uploadWithUploadthing } from "../providers/uploadthing";



export type FileUploadResponse = string | string[]; // A single URL or an array of URLs

// Enum for choosing providers
export enum Provider {
  S3 = "s3",
  Cloudinary = "cloudinary",
  Uploadthing = "uploadthing",
  Multer = "multer",
}

// The facade interface
export const UploadService = async (
  files: UploadedFile[], // or any file structure you're using
  provider: Provider
): Promise<FileUploadResponse> => {
  switch (provider) {
    case Provider.S3:
      return await uploadToS3(files);
    case Provider.Cloudinary:
      return await uploadToCloudinary(files);
    case Provider.Uploadthing:
      return await uploadWithUploadthing(files);
    case Provider.Multer:
      return await uploadWithMulter(files);
    default:
      throw new Error("Invalid provider selected");
  }
};
