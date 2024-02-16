import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../customAxiosInstance";

export function useNetwordCall(method, url, payload) {
  const store = useSelector((store) => store.auth);
  const token = store?.token?.jwtToken;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      let allData = await AuthAxiosInstance(token).get(url);
      if (method === "get") {
        allData = await AuthAxiosInstance(token).get(url);
      } else if (method === "post") {
        allData = await AuthAxiosInstance(token).post(url, payload);
      } else if (method === "delete") {
        allData = await AuthAxiosInstance(token).delete(url);
      }
      // console.log(allData);

      if (allData.status === 200) {
        // console.log(allData.data);
        setData(allData.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, token };
}
