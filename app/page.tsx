import { GoogleMapsEmbed } from "@next/third-parties/google";
import AppLayout from "../components/layouts/AppLayout";
import LongdoMap from "@/components/LongdoMap";

export default function Home() {
  const locations = [
    {
      id: 1,
      name: "ร้านกาแฟ A",
      lat: 13.84,
      lon: 100.41,
      detail: "เปิด 08:00 - 17:00",
    },
    {
      id: 2,
      name: "ร้านข้าว B",
      lat: 13.845,
      lon: 100.415,
      detail: "อาหารอร่อยมาก",
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
