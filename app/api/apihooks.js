import { useState, useEffect } from "react";
import { getGamesDataByCategory, isResponseOk } from "./apiutils";

export function useGetDataByCategory(endpoint, category) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getGamesDataByCategory(endpoint, category);
      isResponseOk(data) ? setData(data) : setData([]);
    }

    fetchData();
  }, []);

  return data;
}
