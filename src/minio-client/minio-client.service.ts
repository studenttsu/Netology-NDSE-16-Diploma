import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as Minio from 'minio';

@Injectable()
export class MinioClientService {
  private readonly bucketName: string;

  public get client(): Minio.Client {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.bucketName = process.env.MINIO_BUCKET;
  }

  async uploadFile(
    file: Express.Multer.File,
    objectId: string,
  ): Promise<string> {
    const fileName = `${objectId}-${file.originalname}`;

    await this.client.putObject(this.bucketName, fileName, file.buffer, {
      'Content-Type': file.mimetype,
    });

    return `${this.bucketName}/${fileName}`;
  }

  getFileUrl(fileName: string) {
    return this.client.presignedUrl('GET', this.bucketName, fileName);
  }

  async deleteFile(fileName: string) {
    await this.client.removeObject(this.bucketName, fileName);
  }
}
