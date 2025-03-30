import React from "react";

interface ItemProps {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  onDelete: (id: number) => void;
  onAddToCart: (item: any) => void; // ✅ Ensure onAddToCart is required
}

const ItemCard: React.FC<ItemProps> = ({ id, name, category, price, stock, imageUrl, onDelete, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-md shadow-md flex items-center justify-between">
      <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">Category: {category}</p>
        <p className="text-gray-800 font-bold">${price.toFixed(2)}</p>
        <p className={`text-sm ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </p>
      </div>
      <div className="space-x-2">
        <button 
          onClick={() => onAddToCart({ id, name, category, price, stock, imageUrl })}
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
