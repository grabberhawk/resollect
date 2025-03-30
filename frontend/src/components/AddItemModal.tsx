import React, { useState } from "react";
import axios from "axios";

interface AddItemModalProps {
  onClose: () => void;
  onAdd: () => void;
}

const categories = [ "Speakers", "Headphones", "Laptops", "Cameras", "Smartphones","Electronics", "Fashion", "Home Appliances", "Books", "Beauty & Personal Care", "Toys & Games", "Sports & Outdoors", "Automobiles", "Groceries"];
const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]); 
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddItem = async () => {
    if (!name || !category || !price || !stock || !imageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/items", {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
      });

      onAdd(); // Refresh items list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>

        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <div className="flex justify-between">
          <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
