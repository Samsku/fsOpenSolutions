const FilterSearch = ({ search, onChange }) => (
    <div>
        Search: <input value={search} onChange={onChange} />
    </div>
);

export default FilterSearch;
