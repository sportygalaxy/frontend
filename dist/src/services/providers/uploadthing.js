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
exports.uploadWithUploadthing = exports.uploadRouter = void 0;
// uploadRouter.ts
const express_1 = require("uploadthing/express");
const f = (0, express_1.createUploadthing)();
// Define routes for file uploads (images, PDFs, and videos)
exports.uploadRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 5,
        },
    }).onUploadComplete((_a) => __awaiter(void 0, [_a], void 0, function* ({ metadata, file }) {
        console.log("Image upload completed:", file.url);
    })),
    pdfUploader: f({
        pdf: {
            maxFileSize: "4MB",
        },
    }).onUploadComplete((_a) => __awaiter(void 0, [_a], void 0, function* ({ metadata, file }) {
        console.log("PDF upload completed:", file.url);
    })),
    videoUploader: f({
        video: {
            maxFileSize: "32MB",
            maxFileCount: 1,
        },
    }).onUploadComplete((_a) => __awaiter(void 0, [_a], void 0, function* ({ metadata, file }) {
        console.log("Video upload completed:", file.url);
    })),
};
// Upload function for Uploadthing
const uploadWithUploadthing = (files) => __awaiter(void 0, void 0, void 0, function* () {
    // Assuming files is the array from the Uploadthing handler
    const uploadedUrls = files.map((file) => file.url); // Extract URLs from the data
    console.log("PROVIDER ::", { files, uploadedUrls });
    return uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
});
exports.uploadWithUploadthing = uploadWithUploadthing;
