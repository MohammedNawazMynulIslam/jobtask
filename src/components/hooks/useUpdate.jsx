import { useQuery } from "@tanstack/react-query";

const useUpdate = ({ _id }) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["tasks", _id],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:9000/tasklist/${_id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });
  return { data, isLoading, isFetching, refetch };
};

export default useUpdate;
