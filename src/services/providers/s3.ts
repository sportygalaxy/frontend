import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (files: any[]): Promise<string[] | string> => {
  const uploadPromises = files.map((file) =>
    s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `uploads/${file.name}`,
        Body: file.data,
        ACL: "public-read",
      })
      .promise()
  );

  const results = await Promise.all(uploadPromises);
  const urls = results.map((result) => result.Location);
  return urls.length === 1 ? urls[0] : urls;
};
