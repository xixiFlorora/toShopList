import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyLists({ savedLists, loadSavedList, deleteSavedList }) {
  return (
    <div className="mt-6 space-y-4">
      {savedLists.length === 0 ? (
        <p className="text-gray-500">No saved lists yet.</p>
      ) : (
        savedLists.map((list) => (
          <Card key={list.id} className="rounded-2xl shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{list.name}</span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => loadSavedList(list.id)}>
                    Load
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteSavedList(list.id)}>
                    Delete
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm">
                {list.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
