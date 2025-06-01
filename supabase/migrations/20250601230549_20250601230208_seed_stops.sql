INSERT INTO public.bus_stops (stop_id, stop_name, latitude, longitude)
VALUES
('12345', 'Ocean City Transportation Center', 39.2776, -74.5746),
('67890', 'Ocean City Transportation Center', 39.2780, -74.5750)
ON CONFLICT (stop_id) DO NOTHING;