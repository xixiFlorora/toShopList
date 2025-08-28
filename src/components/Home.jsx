import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Boxes, Plus, List } from "lucide-react";

export default function Home({ setTab }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <Card role="button" onClick={() => setTab("catalog")} className="rounded-2xl shadow hover:shadow-md transition cursor-pointer">
        <CardHeader><CardTitle className="flex items-center gap-2 text-[#fbb117]"><Boxes className="w-5 h-5"/>Catalog</CardTitle></CardHeader>
        <CardContent className="text-sm">Maintain categories & items.</CardContent>
      </Card>

      <Card role="button" onClick={() => setTab("new")} className="rounded-2xl shadow hover:shadow-md transition cursor-pointer">
        <CardHeader><CardTitle className="flex items-center gap-2 text-[#fbb117]"><Plus className="w-5 h-5"/>New List</CardTitle></CardHeader>
        <CardContent className="text-sm">Build a list by ticking items or adding custom ones.</CardContent>
      </Card>

      <Card role="button" onClick={() => setTab("lists")} className="rounded-2xl shadow hover:shadow-md transition cursor-pointer">
        <CardHeader><CardTitle className="flex items-center gap-2 text-[#fbb117]"><List className="w-5 h-5"/>My Lists</CardTitle></CardHeader>
        <CardContent className="text-sm">View, load, or delete saved lists.</CardContent>
      </Card>
    </div>
  );
}
