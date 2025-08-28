import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Home from "./components/Home";
import CategoryManager from "./components/CategoryManager";
import NewList from "./components/NewList";
import MyLists from "./components/MyLists";
import { Boxes, Plus, List, Home as HomeIcon } from "lucide-react";

const seedCategories = [
  { id: "cat-fruits", name: "Fruits", items: [{ id: "fr-apple", name: "Apples" }] },
  { id: "cat-dairy", name: "Dairy", items: [{ id: "da-milk", name: "Milk" }] },
];

const LS_KEYS = {
  categories: "shopping_categories_v1",
  savedLists: "shopping_saved_lists_v1",
};

export default function App() {
  const [tab, setTab] = useState("home");

  // Catalog (DB)
  const [categories, setCategories] = useState(() => {
    const raw = localStorage.getItem(LS_KEYS.categories);
    return raw ? JSON.parse(raw) : seedCategories;
  });

  // New List builder
  const [newListItems, setNewListItems] = useState([]);
  const [customItem, setCustomItem] = useState("");
  const [saveName, setSaveName] = useState("");

  // Saved lists
  const [savedLists, setSavedLists] = useState(() => {
    const raw = localStorage.getItem(LS_KEYS.savedLists);
    return raw ? JSON.parse(raw) : [];
  });

  // Persist
  useEffect(() => {
    localStorage.setItem(LS_KEYS.categories, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.savedLists, JSON.stringify(savedLists));
  }, [savedLists]);

  // Helpers
  const allItems = useMemo(
    () => categories.flatMap((c) => c.items.map((it) => ({ ...it, categoryId: c.id }))),
    [categories]
  );

  const isInNewList = (name) => newListItems.includes(name);
  const toggleItemInList = (name, checked) => {
    setNewListItems((prev) =>
      checked ? [...new Set([...prev, name])] : prev.filter((x) => x !== name)
    );
  };

  const addCustomItem = () => {
    const v = customItem.trim();
    if (!v) return;
    if (!newListItems.includes(v)) setNewListItems((s) => [...s, v]);
    setCustomItem("");
  };

  const clearCurrentList = () => setNewListItems([]);
  const saveCurrentList = () => {
    const name = saveName.trim() || `List ${new Date().toLocaleString()}`;
    if (newListItems.length === 0) return;
    const payload = { id: `list-${Date.now()}`, name, items: newListItems, createdAt: new Date().toISOString() };
    setSavedLists((s) => [payload, ...s]);
    setSaveName("");
  };
  const deleteSavedList = (id) => setSavedLists((s) => s.filter((l) => l.id !== id));
  const loadSavedList = (id) => {
    const found = savedLists.find((l) => l.id === id);
    if (found) {
      setNewListItems(found.items);
      setTab("new");
    }
  };

  const createCategory = (name) => {
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [...prev, { id, name, items: [] }]);
  };
  const addItemToCategory = (catId, itemName) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId ? { ...c, items: [...c.items, { id: `${c.id}-${Date.now()}`, name: itemName }] } : c
      )
    );
  };
  const resetDemoData = () => setCategories(seedCategories);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <Tabs value={tab} onValueChange={setTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 gap-2 bg-gray-200 dark:bg-gray-800 rounded-2xl p-2">
          <TabsTrigger value="home"><HomeIcon className="w-4 h-4"/> Home</TabsTrigger>
          <TabsTrigger value="catalog"><Boxes className="w-4 h-4"/> Catalog</TabsTrigger>
          <TabsTrigger value="new"><Plus className="w-4 h-4"/> New List</TabsTrigger>
          <TabsTrigger value="lists"><List className="w-4 h-4"/> My Lists</TabsTrigger>
        </TabsList>

        <TabsContent value="home"><Home setTab={setTab}/></TabsContent>
        <TabsContent value="catalog">
          <CategoryManager
            categories={categories}
            createCategory={createCategory}
            addItemToCategory={addItemToCategory}
            resetDemoData={resetDemoData}
          />
        </TabsContent>
        <TabsContent value="new">
          <NewList
            categories={categories}
            newListItems={newListItems}
            customItem={customItem}
            saveName={saveName}
            isInNewList={isInNewList}
            toggleItemInList={toggleItemInList}
            addCustomItem={addCustomItem}
            clearCurrentList={clearCurrentList}
            saveCurrentList={saveCurrentList}
            setCustomItem={setCustomItem}
            setSaveName={setSaveName}
          />
        </TabsContent>
        <TabsContent value="lists">
          <MyLists savedLists={savedLists} loadSavedList={loadSavedList} deleteSavedList={deleteSavedList}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
