DELETE FROM public.bus_locations WHERE timestamp < NOW() - INTERVAL '7 days';
