import fetcher from "@/lib/fetcher";
import useSWR from "swr";

//this is the custom hook it will save our time , if the user logged in then it will directly give us the data
const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/current", fetcher);
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
export default useCurrentUser;
