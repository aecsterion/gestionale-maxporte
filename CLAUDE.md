# Gestionale Max Porte (MPX) — note per Claude

## Database Supabase

- Progetto: `Gestionale MP` (ref `tvfpekldunmegzdjpact`, eu-west-1).
- Le modifiche di schema si applicano come migrazioni (MCP `apply_migration` o file in `supabase/migrations/`), mai a mano senza traccia.
- Il client (index.html / server.js) usa la chiave **anon** + sessione utente, quindi le query arrivano come ruolo `authenticated`.

### Regola obbligatoria: GRANT esplicito per ogni nuova tabella in `public`

Dal **30 ottobre 2026** Supabase non concede più automaticamente l'accesso Data API (supabase-js, PostgREST, GraphQL)
alle nuove tabelle dello schema `public`. Una tabella senza GRANT restituisce `permission denied`.
Vale anche per branch di preview, nuovi progetti e `supabase db reset`.

Ogni migrazione che crea una tabella (o la ricrea, o crea una view) deve contenere, nello stesso file:

```sql
create table public.nome_tabella ( ... );

alter table public.nome_tabella enable row level security;

create policy "auth_all" on public.nome_tabella
  for all to authenticated
  using (true) with check (true);   -- o una condizione più stretta

grant select, insert, update, delete on public.nome_tabella to authenticated;
grant select, insert, update, delete on public.nome_tabella to service_role;
-- grant select on public.nome_tabella to anon;   -- SOLO se la tabella deve essere leggibile senza login
```

Checklist prima di chiudere una migrazione:
1. RLS abilitata.
2. Almeno una policy, rivolta a `authenticated` (non a `public`).
3. GRANT a `authenticated` e `service_role`; a `anon` solo se serve davvero.
4. Se la tabella ha una colonna `identity`/`serial`, nessun grant extra sulle sequence è necessario con `identity`;
   con `serial` aggiungere `grant usage, select on sequence public.nome_tabella_id_seq to authenticated, service_role;`.

Verifica rapida dopo la migrazione:

```sql
select c.relname,
       has_table_privilege('authenticated', c.oid, 'select') as auth_sel,
       has_table_privilege('service_role',  c.oid, 'select') as svc_sel,
       c.relrowsecurity as rls
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind in ('r','v','m','p')
order by 1;
```
