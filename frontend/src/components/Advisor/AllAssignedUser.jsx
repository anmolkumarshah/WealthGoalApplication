import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import AssignedUserItem from "./AssignedUserItem";
import { LoadingSpinner } from "../common/LoadingSpinner";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AllAssignedUser() {
  useNonAuthRedirect();
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;

    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/advisor/${userId}/end-users`
      );

      if (allData.status === 200) {
        setData(allData.data);
        setFilteredData(allData.data); // Initialize filteredData with allData
      }
    }
  };

  const filterData = () => {
    if (searchText.trim() === "") {
      setFilteredData(data); // If the search text is empty, show all data
    } else {
      const lowerCaseSearch = searchText.toLowerCase();
      const filtered = data.filter((item) =>
        item.personalDetail.name.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchText]);

  if (filteredData === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full md:w-1/2  p-2">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 mb-4 border rounded-md w-full"
      />

      {/* Render filtered data */}
      {filteredData.map((item) => (
        <AssignedUserItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default AllAssignedUser;
