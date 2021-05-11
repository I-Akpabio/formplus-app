import { DEFAULT, ASCENDING, DESCENDING } from './constants';

export const searchFilter = (term, data) => {
	if(term === "") return data;
    term = term.toLowerCase();
    return data.filter((item) => item.description.toLowerCase().indexOf(term) > -1 
    	|| item.name.toLowerCase().indexOf(term) > -1)
}

export const orderFilter = (filter, data) => {
	const ascendingFunction = (a, b) => {
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		if (x < y) {return -1;}
		if (x > y) {return 1;}
		return 0;
	}

	const descendingFunction = (a, b) => {
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		if (x < y) {return 1;}
		if (x > y) {return -1;}
		return 0;
	}

	switch (filter) {
		case DEFAULT: return data;
		case ASCENDING: return data.slice().sort(ascendingFunction);
		case DESCENDING: return data.slice().sort(descendingFunction);
		default: return data;
	}

}

export const dateFilter = (filter, data) => {

	const sortAscFunction = (a, b) => {
		var x = typeof(a.created) == 'string' ? new Date(a.created) : a.created;
		var y = typeof(b.created) == 'string' ? new Date(b.created) : b.created;
		return x - y;
	}

	const sortDescFunction = (a, b) => {
		var x = typeof(a.created) == 'string' ? new Date(a.created) : a.created;
		var y = typeof(b.created) == 'string' ? new Date(b.created) : b.created;
		return y - x;
	}

	switch (filter) {
		case DEFAULT: return data;
		case ASCENDING: return data.slice().sort(sortAscFunction);
		case DESCENDING: return data.slice().sort(sortDescFunction);
		default: return data;
	}

}

export const categoryFilter = (category, data) => {
	if(category === 'All') return data;
	return data.filter((item) => item.category.indexOf(category) > -1)
}