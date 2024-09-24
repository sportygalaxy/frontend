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
exports.upload = void 0;
const async_1 = require("../middleware/async");
const upload_service_1 = require("../services/integration/upload.service");
exports.upload = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { provider = upload_service_1.Provider.Uploadthing } = req.body;
    const files = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    if (!files) {
        return res.status(400).send("No files were uploaded.");
    }
    const filesArray = Array.isArray(files) ? files : [files];
    const urls = yield (0, upload_service_1.UploadService)(filesArray, provider);
    res.status(201).json({
        message: "Files uploaded successfully",
        data: urls,
        success: !!urls,
    });
}));
