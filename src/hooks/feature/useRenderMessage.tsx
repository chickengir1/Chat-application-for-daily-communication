const useRenderMessage = (type: string, text?: string, content?: string) => {
  if (type === "text") {
    return <p>{text}</p>;
  }

  if (type === "image" && content) {
    return (
      <img src={content} alt="Sent image" className="rounded-lg max-w-full" />
    );
  }

  if (type === "video" && content) {
    return (
      <video controls className="rounded-lg max-w-full">
        <source src={content} type="video/mp4" />
        비디오 태그를 지원하지 않습니다!
      </video>
    );
  }

  if (type === "file" && content) {
    return (
      <a
        href={content}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        파일 다운로드
      </a>
    );
  }

  return <p>지원하지 않는 메세지 양식입니다!</p>;
};

export default useRenderMessage;
