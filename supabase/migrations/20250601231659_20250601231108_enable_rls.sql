ALTER TABLE public.bus_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON public.bus_locations FOR SELECT USING (true);

