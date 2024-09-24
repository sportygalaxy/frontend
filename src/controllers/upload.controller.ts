import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middleware/async";
import { Provider, UploadService } from "../services/integration/upload.service";

export const upload = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { provider = Provider.Uploadthing } = req.body;
    const files = req.files?.file;

    if (!files) {
      return res.status(400).send("No files were uploaded.");
    }

    const filesArray = Array.isArray(files) ? files : [files];

    const urls = await UploadService(filesArray, provider);

    res.status(201).json({
      message: "Files uploaded successfully",
      data: urls,
      success: !!urls,
    });
  }
);
