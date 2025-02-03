import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { useState } from "react";

interface FileUploadResponse {
  fileId: string;
  nickname: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  originFileUrl: string;
  thumbNailUrl: string;
  createdAt: string;
  expiredAt: string;
  category: string;
  roomId: string;
}

export const useFileUpload = (
  roomId: string,
  setValue: (value: string) => void
) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await handleApiCall<{
      result: boolean;
      data: FileUploadResponse[];
    }>(
      axiosInstance.post(
        `/api/files/upload?category=CHAT&roomId=${roomId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
    );

    if (!response || !response.result) {
      throw new Error("파일 업로드 실패");
    }
    return response.data[0];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await handleFileUpload(file);
      setValue(result.thumbNailUrl);
    } catch (error) {
      console.error("파일 업로드 실패", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return { handleFileChange, isUploading };
};
