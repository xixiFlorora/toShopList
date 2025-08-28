import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewList({
  categories,
  newListItems,
  customItem,
  saveName,
  isInNewList,
  toggleItemInList,
  addCustomItem,
  clearCurrentList,
  saveCurrentList,
  setCustomItem,
  setSaveName,
}) {
  return (
    <div className="mt-6 space-y-4">
      <Card className="rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="text-[#fbb117]">Build New Shopping List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-semibold">{cat.name}</h3>
              <ul className="space-y-1">
                {cat.items.map((it) => (
                  <li key={it.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isInNewList(it.name)}
                      onChange={(e) => toggleItemInList(it.name, e.target.checked)}
                    />
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex gap-2">
            <Input
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              placeholder="Custom item"
            />
            <Button onClick={addCustomItem}>Add</Button>
          </div>

          <div className="flex gap-2">
            <Input
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="List name"
            />
            <Button onClick={saveCurrentList}>Save</Button>
            <Button variant="outline" onClick={clearCurrentList}>Clear</Button>
          </div>

          <div>
            <h3 className="font-semibold">Preview:</h3>
            <ul className="list-disc pl-5 text-sm">
              {newListItems.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
