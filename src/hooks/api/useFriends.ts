import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { useState } from "react";

export interface User {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string | null;
}

export interface SearchUserRequest {
  search: string;
  page: number;
  size: number;
}

export interface SearchUserResponse {
  content: User[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    last: boolean;
  };
}

export const useFriends = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);

  const [done, setDone] = useState(false);

  const searchUser = async ({ search, page, size }: SearchUserRequest) => {
    if (done) {
      return;
    }

    const { content } = await handleApiCall<SearchUserResponse>(
      axiosInstance.get("/api/users/search", {
        params: {
          nickname: search,
          page,
          size,
        },
      })
    );

    if (!content.length) {
      setDone(true);
      return;
    }

    setPage(page);
    setUsers([...users, ...content]);
  };

  const resetUsers = () => {
    setUsers([]);
    setDone(false);
    setPage(0);
  };

  return { users, page, searchUser, resetUsers };
};
