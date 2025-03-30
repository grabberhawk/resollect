import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ItemCard from "./components/ItemCard";
import AddItemModal from "./components/AddItemModal";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cart, setCart] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      let url = "http://localhost:5000/api/items";
      const params = new URLSearchParams();
      
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory) params.append("category", selectedCategory);

      const response = await axios.get(`${url}?${params.toString()}`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Item
      </button>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={fetchItems}
      />

      {showModal && <AddItemModal onClose={() => setShowModal(false)} onAdd={() => fetchItems()} />}

      <div className="mt-6">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No items found.</p>
        ) : (
          items.map(item => (
            <ItemCard 
              key={item.id} 
              {...item} 
              onDelete={handleDelete} 
              onAddToCart={handleAddToCart} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
