import { pgTable, serial, text, varchar, timestamp, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const bus_locations = pgTable("bus_locations", {
  id: serial("id").primaryKey(),
  route_number: varchar("route_number", { length: 10 }).notNull(), // e.g., "507", "509"
  vehicle_id: varchar("vehicle_id", { length: 50 }).notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  stop_id: varchar("stop_id", { length: 10 }), // NJ Transit stop ID
  stop_name: text("stop_name"), // e.g., "Ocean City Transportation Center"
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  data: jsonb("data").notNull(), // Raw API response
});

export const bus_stops = pgTable("bus_stops", {
  stop_id: varchar("stop_id", { length: 10 }).primaryKey(), // NJ Transit stop ID
  stop_name: text("stop_name").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
});

