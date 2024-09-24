import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (files: any[]): Promise<string[] | string> => {
  const uploadPromises = files.map((file) =>
    cloudinary.v2.uploader.upload(file.tempFilePath)
  );

  const results = await Promise.all(uploadPromises);
  const urls = results.map((result) => result.secure_url);
  return urls.length === 1 ? urls[0] : urls;
};
