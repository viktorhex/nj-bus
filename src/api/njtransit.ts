// src/api/njtransit.ts
import axios from "axios";
import { db, bus_locations } from "../db"; // Imports from src/db/index.ts
import "dotenv/config";

interface NJTransitBusData {
  vehicle_id: string;
  route: string;
  latitude: number;
  longitude: number;
  stop_id?: string;
  stop_name?: string;
  timestamp: string;
  [key: string]: any;
}

// Mock NJ Transit API response
const mockBusData: NJTransitBusData[] = [
  {
    vehicle_id: "1234",
    route: "507",
    latitude: 39.2776,
    longitude: -74.5746,
    stop_id: "12345",
    stop_name: "Ocean City Transportation Center",
    timestamp: new Date().toISOString(),
    speed: 30.5,
    extra: "mock data",
  },
  {
    vehicle_id: "5678",
    route: "509",
    latitude: 39.2780,
    longitude: -74.5750,
    stop_id: "67890",
    stop_name: "Ocean City Transportation Center",
    timestamp: new Date().toISOString(),
    speed: 28.0,
    extra: "mock data",
  },
];

async function fetchBusLocations() {
  const useMock = !process.env.NJTRANSIT_API_USERNAME;
  let buses: NJTransitBusData[];

  if (useMock) {
    console.log("Using mock NJ Transit API data");
    if (Math.random() < 0.1) {
      throw new Error("Mock API failure");
    }
    buses = mockBusData;
  } else {
    const username = process.env.NJTRANSIT_API_USERNAME!;
    const password = process.env.NJTRANSIT_API_PASSWORD!;
    const url = "https://mybusnow.njtransit.com/bustime/api/v3/getvehicles";
    try {
      const response = await axios.get(url, {
        auth: { username, password },
        params: { rt: "507,509", format: "json" },
      });
      buses = response.data["bustime-response"].vehicles;
    } catch (error) {
      console.error("Error fetching NJ Transit data:", error);
      return;
    }
  }

  try {
    for (const bus of buses) {
      await db.insert(bus_locations).values({
        route_number: bus.route,
        vehicle_id: bus.vehicle_id,
        latitude: bus.latitude,
        longitude: bus.longitude,
        stop_id: bus.stop_id,
        stop_name: bus.stop_name || "Ocean City Transportation Center",
        timestamp: new Date(bus.timestamp),
        speed: bus.speed,
        data: bus,
      });
    }
    console.log(`Inserted ${buses.length} bus locations`);
  } catch (error) {
    console.error("Error inserting bus data:", error);
  }
}

// Run every 30 seconds
setInterval(fetchBusLocations, 30 * 1000);

// Export for Bun runtime
export {};