"use client";

import React, { useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { uploadConfig } from "@/constants/appConstants";
import { convertSizeToBytes } from "@/utils/fileUtils";
import { UPLOAD_FORMATS } from "@/constants/appEnums";
import { useMutation } from "@tanstack/react-query";
import { IUserPayload, IUserQueryParam, IUserResponse } from "@/types/user";
import useUserStore from "@/store/userStore";
import { UserData } from "@/types/auth";
import { updateUser } from "@/lib/apiUser";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const { uploadFiles } = generateReactHelpers({
  url: `${BACKEND_BASE_URL}/uploads`, // Use the Uploadthing API endpoint
});

const FileUploadForm: React.FC = () => {
  const { setUser, user } = useUserStore();
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileFormatType, setFileFormatType] = useState<string>(
    UPLOAD_FORMATS.IMAGE
  );

  // Handle multiple file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
    }
  };

  const handleFileFormatTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFileFormatType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files) {
      alert("Please select at least one file.");
      return;
    }

    console.log("Selected file MIME type:", files[0].type);

    // Optional file validation
    const isValidFile = Array.from(files).every((file) => {
      const validFileType = uploadConfig.allowedFileTypes.includes(file.type);
      const validFileSize =
        file.size <= convertSizeToBytes(uploadConfig.maxFileSize); // Use size in bytes
      return validFileType && validFileSize;
    });

    if (!isValidFile) {
      NotifyError(`Invalid file. Ensure file type and size are correct.`);
      return;
    }

    try {
      // Use the uploadFiles helper to upload the files
      const result = await uploadFiles(fileFormatType, {
        files: Array.from(files),
      });

      if (result) {
        const payloadData = {
          userData: {
            avatar: result[0]?.appUrl,
          },
          params: {
            id: `${user?.id}`,
          },
        };

        update(payloadData);

        NotifySuccess(`${result?.[0].name} Upload Successful`);
      } else {
        NotifyError("Upload failed. Please try again.");
      }
    } catch (error) {
      NotifyError(`Error uploading file: ${error}`);
    }
  };

  const {
    mutate: update,
    isPending,
    error,
    data,
  } = useMutation<
    IUserResponse,
    Error,
    { userData: IUserPayload; params: IUserQueryParam }
  >({
    mutationFn: ({ userData, params }) => updateUser({ userData, params }),
    onMutate: async () => {},
    onSuccess: (data) => {
      // TODO: revalidate only mutate properties in the user object
      // setUser(data?.data as UserData);
      NotifySuccess(data?.message as string);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  return (
    <div>
      <h2>Upload Files</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Choose files:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept={uploadConfig.allowedFileTypes.join(",")}
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label htmlFor="fileFormatType">Select fileFormatType:</label>
          <select
            id="fileFormatType"
            name="fileFormatType"
            value={fileFormatType}
            onChange={handleFileFormatTypeChange}
          >
            <option value={UPLOAD_FORMATS.IMAGE}>Image</option>
            <option value={UPLOAD_FORMATS.PDF}>PDF</option>
            <option value={UPLOAD_FORMATS.VIDEO}>Video</option>
          </select>
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadForm;
