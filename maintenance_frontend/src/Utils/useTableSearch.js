// Filtering lists on the basis of search value
import { useState, useEffect } from "react";

// Custom hook to filter the table data, this hook will be used in the ListJobs component
export const useTableSearch = ({ searchVal, jobs }) => {
  // State to manage the filtered data
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to crawl through the object and return all the values
  useEffect(() => {
    setLoading(true);
    const crawl = (user, allValues) => {
      if (!allValues) allValues = [];
      for (var key in user) {
        if (typeof user[key] === "object") crawl(user[key], allValues);
        else allValues.push(user[key] + " ");
      }
      return allValues;
    };
    const fetchData = () => {
      setOrigData(jobs);
      setFilteredData(jobs);
      const searchInd = jobs.map((user) => {
        const allValues = crawl(user);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (jobs) setLoading(false);
    };
    fetchData();
  }, [jobs]);

  // Function to filter the data
  useEffect(() => {
    if (searchVal) {
      const reqData = searchIndex.map((user, index) => {
        if (user.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0)
          return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter((user) => {
          if (user) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  // Return the filtered data
  return { filteredData, loading };
};
