"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const aws_sdk_1 = require("aws-sdk");
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});
const uploadToS3 = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadPromises = files.map((file) => s3
        .upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `uploads/${file.name}`,
        Body: file.data,
        ACL: "public-read",
    })
        .promise());
    const results = yield Promise.all(uploadPromises);
    const urls = results.map((result) => result.Location);
    return urls.length === 1 ? urls[0] : urls;
});
exports.uploadToS3 = uploadToS3;
