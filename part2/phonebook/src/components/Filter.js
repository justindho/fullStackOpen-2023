const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
    <p>filter shown with 
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </p>
  </div>
  )
}

export default Filter