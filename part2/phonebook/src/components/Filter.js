const Filter = ({handleSearch, searchTerm, handleSearchFormChange, setShowAll, showAll}) => {
    return (
        <form onSubmit={handleSearch} >
            <div>
                filter shown with <input placeholder={searchTerm} onChange={handleSearchFormChange}></input>
            </div>
            <button type="submit" onClick={() => setShowAll(!showAll)}>{showAll ? 'Search' : 'Show All'}</button>
        </form>
    )
}

export default Filter;