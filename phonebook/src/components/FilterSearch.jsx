const FilterSearch = ({search, onChange}) => {
    return (
        <div>
            Search <input type="text" onChange={onChange} value={search} />
        </div>
    )
}

export default FilterSearch;