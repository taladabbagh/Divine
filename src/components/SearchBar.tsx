const SearchBar: React.FC<{ searchTerm: string; handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ searchTerm, handleSearch }) => (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearch}
      className="mb-4 p-2 border border-gray-300 rounded mr-3"
    />
  );
  
  export default SearchBar;
  