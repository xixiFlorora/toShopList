import React, { useState, useEffect, useMemo } from 'react';
import './index.css'; 
import Home from "./components/Home";
import CategoryManager from "./components/CategoryManager";
import ShoppingList from "./components/ShoppingList";

export default function App() {
  const [page, setPage] = useState("home");
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("lists");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {page === "home" && <Home onNavigate={setPage} />}
      {page === "categories" && (
        <CategoryManager categories={categories} setCategories={setCategories} onBack={() => setPage("home")} />
      )}
      {page === "lists" && (
        <ShoppingList categories={categories} lists={lists} setLists={setLists} onBack={() => setPage("home")} />
      )}
    </div>
  );
}
