import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://4a9b58644a8fcb9c1695071e4ab7d7e6.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string
  }
});

export async function uploadFile(
  fileName: string,
  localFilePath: string
): Promise<void> {
  const fileContent = await readFile(localFilePath);

  const command = new PutObjectCommand({
    Bucket: "deploy",
    Key: fileName,
    Body: fileContent
  });

  await s3.send(command);
  console.log(`Uploaded ${fileName}`);
}
