import { useQuery } from "@tanstack/react-query";
import { apis, apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useDetailGetExibition = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_DETAILEXHIBITION,
    queryFn: async () => {
      const res = await apis_token.get(`/exhibition/view/${id}`);
      return res.data;
    },
    retry: 1,
    onSuccess: (data) => {},
    onError: (e) => {
      console.log("에러", e.message);
    },
  });
  return [data, isLoading, isError];
};
