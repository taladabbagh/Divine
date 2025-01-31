const SearchBar: React.FC<{ searchTerm: string; handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ searchTerm, handleSearch }) => (
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={handleSearch}
    className="mb-4 px-4 py-2 w-72 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
  />
);

export default SearchBar;
