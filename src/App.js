import React,{ useState, useEffect } from "react";
import "./App.css";
import TemplateList from "./components/TemplateList";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";

import axios from "axios";

import {
  searchFilter,
  orderFilter,
  categoryFilter,
  dateFilter,
} from "./utils/filter";
import { paginate } from "./utils/paginate";
import { CATRGORY_FILTER, DATE_FILTER, ORDER_FILTER } from "./utils/constants";

function App() {
  const [data, setData] = useState([]); // The full set of data gotten from the server
  const [cache, setCache] = useState({}); // A cache for different category filter results

  // A cache for the sorted result by date or alphabetically
  const [sortedData, setSortedData] = useState([]); 

  // The final datset used by the U.I all filter, sorts and potential search have been run
  // the data displayed on the page is a subset of this array
  const [filteredData, setFilteredData] = useState([]);
  // The dataset displayed on the page of 10 results
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleFilter, setToggleFilter] = useState(true);

  const [filter, setFilter] = useState({
    search: "",
    [CATRGORY_FILTER]: "All",
    [DATE_FILTER]: "Default",
    [ORDER_FILTER]: "Default",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates"
        );
        setData(result.data);
        setFilteredData(result.data);
        setSortedData(result.data);
        setLoading(false);
      } catch (err) {
        alert("fail" + err);
      }
    };

    fetchData();
  }, []);

  /**
   * The filtered data has just changed changed the displayed
   * list on the page and reset the pagination to 1
   */
  useEffect(() => {
    setPage(1);
    setPaginatedData(paginate(1, 10, filteredData));
    window.test = filteredData;
  }, [filteredData]);

  const changeFilter = (key, value) => {
    const object = { [key]: value };
    const newFilter = Object.assign({}, filter, object);

    setFilter(newFilter);
    updateFilter(key, newFilter);
  };

  const isEmpty = (arr) => {
    if (arr === null || arr === undefined || arr.length === 0) return true;
    else return false;
  };

  /**
   * @param key the action to perform
   * @param filter the new filter object values
   */
  const updateFilter = (key, filter) => {
    let newData;
    let dataToSort;

    const term = filter["search"];

    switch (key) {
      case "search":
        newData = searchFilter(term, sortedData);
        setSearchActive(term === "" ? false : true);
        break;

      case CATRGORY_FILTER:
        const categoryValue = filter[CATRGORY_FILTER];

        setLoading(true);

        newData = categoryFilter(categoryValue, data);

        // Cache the default category filter array
        const object = { [categoryValue]: newData };
        setCache(Object.assign({}, cache, object));

        // Category Change reset search and all sort filters
        setSearchActive(false)
        setFilter(
          Object.assign({}, filter, {
            search: "",
            [DATE_FILTER]: "Default",
            [ORDER_FILTER]: "Default",
          })
        );

        break;

      case DATE_FILTER:
        if (filter[DATE_FILTER] == "Default") {
          newData = cache[CATRGORY_FILTER] || data;
          break;
        }
        dataToSort = isEmpty(cache[CATRGORY_FILTER]) 
           ? sortedData : cache[CATRGORY_FILTER];

        newData = dateFilter(filter[DATE_FILTER], dataToSort);
        setFilter( Object.assign({}, filter, { [ORDER_FILTER]: "Default" }  ) ) 

        // If a search is active run it after sort
        if (searchActive) {
          newData = searchFilter(term, newData);
        }
        break;
      case ORDER_FILTER:
        if (filter[ORDER_FILTER] == "Default") {
          newData = cache[CATRGORY_FILTER] || data;
          break;
        }
        dataToSort = isEmpty(cache[CATRGORY_FILTER])
          ? sortedData : cache[CATRGORY_FILTER];

        newData = orderFilter(filter[ORDER_FILTER], dataToSort);
        setFilter( Object.assign({}, filter, { [DATE_FILTER]: "Default" } ) ) 

        if (searchActive) {
          newData = searchFilter(term, newData);
        }
        break;
      default:
        return;
    }

    setFilteredData(newData);
    setLoading(false);
    if(key !== "search") {
      setSortedData(newData)
    }
  };

  const changePage = (page) => {
    setPage(page);
    setPaginatedData(paginate(page, limit, filteredData));
  };

  const toggleFilterAction = (e) => setToggleFilter(e.target.checked);

  return (
    <div>
      <nav>
        <ul className="main-nav">
          <li>
            <a href="/test">Templates</a>
          </li>
          <li className="other-links">
            <a href="/test">About</a>
          </li>
          <li className="other-links">
            <a href="/test">Products</a>
          </li>
          <li className="push">
            <div style={{ color: "white", marginRight: '5px' }}>
              Toggle Filter
              <label className="switch">
                <input
                  type="checkbox"
                  checked={toggleFilter}
                  onChange={toggleFilterAction}
                />{" "}
                <div></div>
              </label>
            </div>
          </li>
        </ul>
      </nav>

      <div className="container">
        {toggleFilter ? (
          <FilterBar
            changeFilter={changeFilter}
            date={filter[DATE_FILTER]}
            order={filter[ORDER_FILTER]}
            search={filter["search"]}
          />
        ) : null}

        <h3 className="headerText">
          {searchActive ? `Search "${filter['search']}" in ` : null}
          {filter[CATRGORY_FILTER]} Templates
          
        </h3>
        {/*<button onClick={()=>console.log(cache)}>Show Cache</button>*/}

        {loading ? <p>Loading...</p> : <TemplateList data={paginatedData} />}
      </div>
      {!loading ? 
      <Pagination
        page={page}
        total={filteredData.length}
        limit={limit}
        changePage={changePage}
      />
      : null}
    </div>
  );
}

export default App;
