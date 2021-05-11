import {CATRGORY_FILTER, DATE_FILTER, ORDER_FILTER, DEFAULT, ASCENDING, DESCENDING} from "../utils/constants";
import { debounce } from 'lodash' ;

const FilterBar = ({ changeFilter, date, order, search }) => {
    const onSearchChange =  e => changeFilter('search', e.target.value) 

    const onCategoryChange = e => changeFilter(CATRGORY_FILTER, e.target.value)
    const onDateChange = e => changeFilter(DATE_FILTER, e.target.value)
    const onOrderChange = e => changeFilter(ORDER_FILTER, e.target.value)
    return (
        <div className="page-bar">
            <div className="">
                <div className="searchBar">
                    <input
                        id="searchQueryInput"
                        type="text"
                        name="searchQueryInput"
                        placeholder="Search"
                        onChange={onSearchChange}
                        value={search}
                    />
                    <button
                        id="searchQuerySubmit"
                        type="submit"
                        name="searchQuerySubmit"
                    >
                        <svg
                            style={{ width: "24px", height: "24px" }}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#666666"
                                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="push">
                <div className="flex-grid-thirds">
                    <div className="form-group col">
                        <fieldset>
                            <legend>Category</legend>
                            <select className="filter" onChange={onCategoryChange}>
                                <option value="All">All</option>
                                <option value="Education">Education</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Health">Health</option>
                            </select>
                        </fieldset>
                    </div>

                    <div className="form-group col">
                        <fieldset>
                            <legend>Date</legend>
                            <select className="filter" onChange={onDateChange} value={date}>
                                <option value={DEFAULT}>Default</option>
                                <option value={ASCENDING}>Ascending</option>
                                <option value={DESCENDING}>Descending</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="form-group col">
                       <fieldset>
                            <legend>Alphabetically</legend>
                            <select className="filter" onChange={onOrderChange} value={order}>
                                <option value={DEFAULT}>Default</option>
                                <option value={ASCENDING}>Ascending</option>
                                <option value={DESCENDING}>Descending</option>
                            </select>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FilterBar;