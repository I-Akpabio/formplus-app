export const paginate = (page, limit, data) => {
	const offset = page * limit - limit;
	const offsetEnd = offset + limit;

	return data.slice(offset, offsetEnd);
}