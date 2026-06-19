
CREATE TABLE public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    validity TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.packages
    FOR SELECT USING (true);

CREATE POLICY "Allow admin full access" ON public.packages
    FOR ALL USING (auth.role() = 'authenticated');
