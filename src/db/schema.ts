// src/db/schema.ts
import { pgTable, serial, varchar, text, timestamp, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const bus_locations = pgTable(
  "bus_locations",
  {
    id: serial("id").primaryKey(),
    route_number: varchar("route_number", { length: 10 }).notNull(),
    vehicle_id: varchar("vehicle_id", { length: 50 }).notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    stop_id: varchar("stop_id", { length: 10 }),
    stop_name: text("stop_name"),
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
    speed: doublePrecision("speed"),
    data: jsonb("data").notNull(),
  },
  (table) => ({
    schema: "public",
  })
);

export const bus_stops = pgTable(
  "bus_stops",
  {
    stop_id: varchar("stop_id", { length: 10 }).primaryKey(),
    stop_name: text("stop_name").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
  },
  (table) => ({
    schema: "public", // Explicitly set schema to public
  })
);