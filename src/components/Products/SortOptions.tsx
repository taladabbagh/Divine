const SortOptions: React.FC<{ sortOrder: string; handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ sortOrder, handleSort }) => (
  <select
    value={sortOrder}
    onChange={handleSort}
    className="mb-4 px-4 py-2 w-48 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
  >
    <option value="default">Sort By</option>
    <option value="priceAsc">Price: Low to High</option>
    <option value="priceDesc">Price: High to Low</option>
    <option value="name">Title</option>
  </select>
);

export default SortOptions;
