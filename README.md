# migrations


```sh
# generate migrations with drizzle
./scripts/drizzle_generate

# copy latest drizzle migration to supabase/migrations
./scripts/sync-migrations.sh

# apply supabase migrations to nonproduction
./scripts/apply_nonprod_migrations.sh
```