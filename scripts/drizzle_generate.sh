export $(cat .env.nonprod | xargs)
bunx drizzle-kit generate
