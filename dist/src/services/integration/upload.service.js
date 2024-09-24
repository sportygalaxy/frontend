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
exports.UploadService = exports.Provider = void 0;
const cloudinary_1 = require("../providers/cloudinary");
const multer_1 = require("../providers/multer");
const s3_1 = require("../providers/s3");
const uploadthing_1 = require("../providers/uploadthing");
// Enum for choosing providers
var Provider;
(function (Provider) {
    Provider["S3"] = "s3";
    Provider["Cloudinary"] = "cloudinary";
    Provider["Uploadthing"] = "uploadthing";
    Provider["Multer"] = "multer";
})(Provider || (exports.Provider = Provider = {}));
// The facade interface
const UploadService = (files, // or any file structure you're using
provider) => __awaiter(void 0, void 0, void 0, function* () {
    switch (provider) {
        case Provider.S3:
            return yield (0, s3_1.uploadToS3)(files);
        case Provider.Cloudinary:
            return yield (0, cloudinary_1.uploadToCloudinary)(files);
        case Provider.Uploadthing:
            return yield (0, uploadthing_1.uploadWithUploadthing)(files);
        case Provider.Multer:
            return yield (0, multer_1.uploadWithMulter)(files);
        default:
            throw new Error("Invalid provider selected");
    }
});
exports.UploadService = UploadService;
