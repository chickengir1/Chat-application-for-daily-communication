export interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  position: "left" | "right";
  type: "text" | "image" | "video" | "file";
  content?: string;
}
