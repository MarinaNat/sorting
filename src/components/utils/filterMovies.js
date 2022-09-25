const filterItems = (items, search) => {
	const filteredMovies = items.filter((item) => {
		return (
			(item?.name
				?.toLowerCase()
				.includes(search?.query?.toLowerCase().trim())) &&
			(search.value ? item.duration <= 40 : true)
		);
	});
	return filteredMovies;
}
export default filterItems;