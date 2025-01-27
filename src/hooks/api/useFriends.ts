import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

export interface User {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string | null;
}

interface SearchFriendRequest {
  search: string;
  page: number;
  size: number;
}

interface SearchFriendResponse {
  content: User[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    last: boolean;
  };
}

export const useFriends = () => {
  const searchFriends = async ({ search, page, size }: SearchFriendRequest) => {
    const { content } = await handleApiCall<SearchFriendResponse>(
      axiosInstance.get("/api/users/search", {
        params: {
          nickname: search,
          page,
          size,
        },
      })
    );

    return { content };
  };

  return { searchFriends };
};
