import { useState, useEffect } from 'react';
import './App.css';
import TemplateList from "./components/TemplateList"
import FilterBar from "./components/FilterBar"
import Pagination from "./components/Pagination";

import axios from 'axios'

import { searchFilter, orderFilter, categoryFilter } from './utils/filter';
import { paginate } from './utils/paginate';
import { CATRGORY_FILTER, DATE_FILTER, ORDER_FILTER } from './utils/constants';

function App() {
  const [ data, setData] = useState([]);
  const [ filteredData, setFilteredData] = useState([]);
  const [ paginatedData, setPaginatedData] = useState([]);
  const [ page, setPage] = useState(1);
  const [ limit, setLimit] = useState(10);

  const [filter, setFilter] = useState({
      search: "",
      [CATRGORY_FILTER]: "All",
      [DATE_FILTER]: "Default",
      [ORDER_FILTER]: "Default"
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost/templates',
      );
     
      setData(result.data)
      setFilteredData(result.data)
      setPaginatedData(paginate(1, 10, result.data))
    };
 
    fetchData();
  }, []);

  /**
   * The filtered data has just changed changed the displayed
   * list on the page and reset the pagination to 1
   */
  useEffect(() => {
    setPage(1);
    setPaginatedData(paginate(1, limit, filteredData))
    window.test = filteredData
  }, [filteredData])

  const changeFilter = (key, value) => {
    const object = {[key]: value}
    const newFilter = Object.assign({}, filter, object)

    setFilter(newFilter)
    updateFilter(key, newFilter)
  }

  const updateFilter = (key, filter) => {
    let newData;

    switch( key ) {
      case "search":
        newData = searchFilter(filter['search'], filteredData);
        console.log(newData);
      break;

      case CATRGORY_FILTER:
        newData = categoryFilter(filter[CATRGORY_FILTER], data);
      break;

      case DATE_FILTER:
       newData = orderFilter(filter, data);
      break;
      case ORDER_FILTER:
        newData = orderFilter(filter, data);
      break;
      default: return;
    }
    
    setFilteredData(newData);
  }

  const changePage = (page) => {
    setPage(page);
    setPaginatedData(paginate(page, limit, filteredData));
  }

   return (
     <div>
         <nav>
    <ul class="main-nav">
      <li><a href="/test">Templates</a></li>
      <li><a href="/test">About</a></li>
      <li><a href="/test">Products</a></li>
      <li><a href="/test">Our Team</a></li>
      <li class="push"><a href="">Contact</a></li>
    </ul>
  </nav>

  <div style={{marginTop: "2rem"}} className="container">

      <FilterBar changeFilter={changeFilter} />

      <h3>{filter[CATRGORY_FILTER]} Templates</h3>

      <TemplateList data={paginatedData} />

     

    </div> 
     <Pagination 
        page={page} 
        total={filteredData.length} 
        limit={limit} 
        changePage={changePage}
      />
     </div>
    
  );
}

export default App;
