export $(cat .env.nonprod | xargs)
bunx supabase db push