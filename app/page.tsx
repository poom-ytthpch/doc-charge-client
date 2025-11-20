import AppLayout from "../components/layouts/AppLayout";
import LongdoMap from "@/components/LongdoMap";

export default function Home() {
  const locations = [
    {
      id: 1,
      name: "Mock Station A",
      lat: 13.84,
      lon: 100.41,
      detail: "เปิด 08:00 - 17:00",
    },
    {
      id: 2,
      name: "Mock Station B",
      lat: 13.845,
      lon: 100.415,
      detail: "เปิด 09:00 - 18:00",
    },
  ];
  return (
    <AppLayout>
      <div className="flex flex-col items-center gap-6 w-full h-full">
        <span className=" text-2xl font-semibold bold">Welcome to DocCharge!</span>

        <LongdoMap locations={locations} />
      </div>
    </AppLayout>
  );
}
