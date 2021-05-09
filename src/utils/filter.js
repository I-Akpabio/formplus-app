export const searchFilter = (term, data) => {
	if(term === "") return;
    term = term.toLowerCase();
    alert(term);
    return data.filter((item) => item.description.toLowerCase().indexOf(term) > -1 
    	|| item.name.toLowerCase().indexOf(term) > -1)
}

export const orderFilter = (filterObject, data) => {
    console.log(filterObject)
}

export const categoryFilter = (category, data) => {
	if(category === 'All') return data;
	return data.filter((item) => item.category.indexOf(category) > -1)
}