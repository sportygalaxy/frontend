"use client";

import { uploadConfig } from "@/constants/appConstants";
import useUserStore from "@/store/userStore";
import { UserData } from "@/types/auth";
import { updateUser } from "@/lib/apiUser";
import { deepReplace } from "@/utils/objectUtils";
import { convertSizeToBytes } from "@/utils/fileUtils";
import { generateReactHelpers } from "@uploadthing/react";
import { FC, useState } from "react";

import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { UPLOAD_FORMATS } from "@/constants/appEnums";
import { useMutation } from "@tanstack/react-query";
import { IUserPayload, IUserQueryParam, IUserResponse } from "@/types/user";
import { Button } from "@/components/ui/button";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const { uploadFiles } = generateReactHelpers({
  url: `${BACKEND_BASE_URL}/uploads`, // Use the Uploadthing API endpoint
});

interface ProfileAvatarUploaderProps {
  show: boolean;
  toggle: () => void;
}
const ProfileAvatarUploader: FC<ProfileAvatarUploaderProps> = ({
  show,
  toggle,
}) => {
  const { setUser, user } = useUserStore();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileFormatType, setFileFormatType] = useState<string>(
    UPLOAD_FORMATS.IMAGE
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Handle file selection and preview generation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Handle file drop for drag-and-drop functionality
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      setFiles(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Handle drag over to prevent default behavior
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);

    if (!files) {
      setIsUploading(false);
      alert("Please select at least one file.");
      return;
    }

    console.log("Selected file MIME type:", files[0]?.type);

    // Optional file validation
    const isValidFile = Array.from(files).every((file) => {
      const validFileType = uploadConfig.allowedFileTypes.includes(file.type);
      const validFileSize =
        file.size <= convertSizeToBytes(uploadConfig.maxFileSize); // Use size in bytes

      setIsUploading(false);
      return validFileType && validFileSize;
    });

    if (!isValidFile) {
      NotifyError(`Invalid file. Ensure file type and size are correct.`);
      setIsUploading(false);
      return;
    }

    try {
      setIsUploading(true);
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
        toggle();
        setIsUploading(false);
      } else {
        toggle();
        setIsUploading(false);
        NotifyError("Upload failed. Please try again.");
      }
    } catch (error) {
      setIsUploading(false);
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
      setUser(deepReplace(user, ["avatar"], data?.data?.avatar) as UserData);
      NotifySuccess(data?.message as string);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full mt-4 max-w-lg mx-auto">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload Files
        </label>

        <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
          {/* Dropzone area */}
          <div
            className="flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 focus:outline-none cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H20V4a4 4 0 00-4-4H8a4 4 0 00-4 4v40a4 4 0 004 4h32a4 4 0 004-4V16a4 4 0 00-4-4h-8V8z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Drag and drop files, or click to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept={uploadConfig.allowedFileTypes.join(",")}
                    className="sr-only"
                    // multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>

            {/* Image preview section */}
            {previews.length > 0 && (
              <div className="mt-4 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="object-cover h-32 w-32 rounded-md flex items-center justify-center"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                      onClick={() => {
                        const newFiles = files.filter((_, i) => i !== index);
                        const newPreviews = previews.filter(
                          (_, i) => i !== index
                        );
                        setFiles(newFiles);
                        setPreviews(newPreviews);
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Button */}
          <div className="">
            <Button className="hover:bg-[#18dd81]" type="submit">
              {isPending || isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileAvatarUploader;
