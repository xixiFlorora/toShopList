import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoryManager({ categories, createCategory, addItemToCategory, resetDemoData }) {
  const [newCategory, setNewCategory] = useState("");
  const [itemInputs, setItemInputs] = useState({}); // {catId: "item name"}

  return (
    <div className="mt-6 space-y-4">
      <Card className="rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="text-[#fbb117]">Add Category</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
          />
          <Button
            onClick={() => {
              if (newCategory.trim()) {
                createCategory(newCategory.trim());
                setNewCategory("");
              }
            }}
          >
            Add
          </Button>
          <Button variant="outline" onClick={resetDemoData}>
            Reset Demo
          </Button>
        </CardContent>
      </Card>

      {categories.map((cat) => (
        <Card key={cat.id} className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{cat.name}</span>
              <div className="flex gap-2">
                <Input
                  className="w-40"
                  value={itemInputs[cat.id] || ""}
                  onChange={(e) =>
                    setItemInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  placeholder="Add item"
                />
                <Button
                  onClick={() => {
                    const val = itemInputs[cat.id]?.trim();
                    if (val) {
                      addItemToCategory(cat.id, val);
                      setItemInputs((p) => ({ ...p, [cat.id]: "" }));
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {cat.items.map((it) => (
                <li key={it.id}>{it.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
