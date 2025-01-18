const SortOptions: React.FC<{ sortOrder: string; handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ sortOrder, handleSort }) => (
    <select value={sortOrder} onChange={handleSort} className="mb-4 p-2 border border-gray-300 rounded">
      <option value="default">Sort By</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="name">Title</option>
    </select>
  );
  
  export default SortOptions;
  