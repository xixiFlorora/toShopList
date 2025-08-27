import { useState } from "react";


export default function ShoppingList() {
const [items, setItems] = useState([
{ id: 1, name: "Apples", purchased: false },
{ id: 2, name: "Carrots", purchased: true },
]);
const [newItem, setNewItem] = useState("");


const addItem = () => {
if (newItem.trim()) {
setItems([...items, { id: Date.now(), name: newItem, purchased: false }]);
setNewItem("");
}
};


const toggleItem = (id) => {
setItems(
items.map((item) =>
item.id === id ? { ...item, purchased: !item.purchased } : item
)
);
};


const removeItem = (id) => {
setItems(items.filter((item) => item.id !== id));
};


return (
<div className="p-4">
<h2 className="text-xl font-semibold mb-4">Shopping List</h2>
<div className="flex mb-4">
<input
type="text"
value={newItem}
onChange={(e) => setNewItem(e.target.value)}
className="border p-2 rounded w-full mr-2"
placeholder="Add new item"
/>
<button
onClick={addItem}
className="bg-green-500 text-white px-4 py-2 rounded"
>
Add
</button>
</div>
<ul className="list-disc pl-5">
{items.map((item) => (
<li key={item.id} className="flex justify-between items-center mb-2">
<span
onClick={() => toggleItem(item.id)}
className={`cursor-pointer ${
item.purchased ? "line-through text-gray-500" : ""
}`}
>
{item.name}
</span>
<button
onClick={() => removeItem(item.id)}
className="text-red-500 hover:underline"
>
Remove
</button>
</li>
))}
</ul>
</div>
);
}