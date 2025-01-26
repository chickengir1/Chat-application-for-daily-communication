// TODO: 파일 업로드 응답 타입 정의
// - 파일 업로드 기능 만들어야함
// - 전송만하고 웹소켓에서 썸네일이랑 url만 받아오면 가능할듯
export interface FileUploadResponse {
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
