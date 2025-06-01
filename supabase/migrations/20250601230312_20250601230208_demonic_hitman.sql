CREATE TABLE "bus_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_number" varchar(10) NOT NULL,
	"vehicle_id" varchar(50) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"stop_id" varchar(10),
	"stop_name" text,
	"timestamp" timestamp with time zone NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bus_stops" (
	"stop_id" varchar(10) PRIMARY KEY NOT NULL,
	"stop_name" text NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL
);
