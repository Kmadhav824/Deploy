import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_API as string,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string
  }
});

export async function uploadFile(
  fileName: string,
  localFilePath: string
): Promise<void> {
  const fileContent = await readFile(localFilePath);

  const command = new PutObjectCommand({
    Bucket: "store",
    Key: fileName,
    Body: fileContent,
  });

  await s3.send(command);
  console.log(`Uploaded ${fileName}`);
}
