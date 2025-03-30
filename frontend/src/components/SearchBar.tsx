import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onSearch: () => void;
}

const categories = ["All", "Speakers", "Headphones", "Laptops", "Cameras", "Smartphones","Electronics", "Fashion", "Home Appliances", "Books", "Beauty & Personal Care", "Toys & Games", "Sports & Outdoors", "Automobiles", "Groceries"];

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      {/* Desktop Search Bar */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-1/2"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-2 p-2 border rounded-md"
        >
          {categories.map((category) => (
            <option key={category} value={category === "All" ? "" : category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button onClick={onSearch} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="sm:hidden flex items-center justify-between">
        <h2 className="text-xl font-bold">Search</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Dropdown for Mobile */}
      {menuOpen && (
        <div className="sm:hidden mt-4 p-4 border rounded-md bg-white shadow-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full"
          >
            {categories.map((category) => (
              <option key={category} value={category === "All" ? "" : category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={onSearch} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
