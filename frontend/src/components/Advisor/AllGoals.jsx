import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import GoalItem from "./GoalItem";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AllGoals() {
  useNonAuthRedirect();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;

    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `advisor/${userId}/goals?type=`
      );

      if (allData.status === 200) {
        setData(allData.data);
        setFilteredData(allData.data); // Initialize filteredData with allData
      }
    }
  };

  const filterAndSortData = () => {
    let filtered = [...data]; // Make a copy of the original data

    // Apply filters based on status and priority
    if (statusFilter !== "All") {
      filtered = filtered.filter((el) => el.goalStatus === statusFilter);
    }

    if (priorityFilter !== "All") {
      filtered = filtered.filter((el) => el.goalPriority === priorityFilter);
    }

    // Apply search text filter
    if (searchText.trim() !== "") {
      const lowerCaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        (el) =>
          el.goalTitle.toLowerCase().includes(lowerCaseSearch) ||
          el.goalDescription.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [data, statusFilter, priorityFilter, searchText]);

  if (filteredData === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-100  w-100 md:w-1/2 m-2">
      <div className="flex mb-4 flex-wrap justify-between px-2">
        {/* Status filter dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className=" p-2 border rounded-md"
        >
          <option value="All">All Status</option>
          {/* Add other status options based on your actual data */}
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* Priority filter dropdown */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="mr-4 p-2 border rounded-md"
        >
          <option value="All">All Priority</option>
          {/* Add other priority options based on your actual data */}
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Search text input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Render filtered and sorted data */}
      {filteredData.map((el) => (
        <GoalItem key={el.goalId} fetchCb={fetchData} goal={el} />
      ))}
    </div>
  );
}

export default AllGoals;
