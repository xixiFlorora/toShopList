import { useState } from "react";


export default function CategoryManager() {
const [categories, setCategories] = useState(["Fruits", "Vegetables"]);
const [newCategory, setNewCategory] = useState("");


const addCategory = () => {
if (newCategory.trim() && !categories.includes(newCategory)) {
setCategories([...categories, newCategory]);
setNewCategory("");
}
};


const removeCategory = (category) => {
setCategories(categories.filter((c) => c !== category));
};


return (
<div className="p-4">
<h2 className="text-xl font-semibold mb-4">Category Manager</h2>
<div className="flex mb-4">
<input
type="text"
value={newCategory}
onChange={(e) => setNewCategory(e.target.value)}
className="border p-2 rounded w-full mr-2"
placeholder="Add new category"
/>
<button
onClick={addCategory}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Add
</button>
</div>
<ul className="list-disc pl-5">
{categories.map((category) => (
<li key={category} className="flex justify-between items-center mb-2">
<span>{category}</span>
<button
onClick={() => removeCategory(category)}
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