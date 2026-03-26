import { Grid } from "@/features/pathfinder/components/Grid";
import { Map } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center py-10 font-sans">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4 text-blue-600">
          <Map size={36} />
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-800">
            A* Pathfinding Engine
          </h1>
        </div>
        <p className="text-neutral-500 max-w-lg mx-auto">
          Siçanla xanaların üzərində basılı tutaraq divarlar çəkin. Daha sonra alqoritm başlanğıc (Yaşıl) nöqtəsindən hədəfə (Qırmızı) ən qısa yolu tapacaq.
        </p>
      </div>
      <Grid />
    </main>
  );
}