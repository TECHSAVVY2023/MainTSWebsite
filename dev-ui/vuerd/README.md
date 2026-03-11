# Vuerd / ERD for TECH SAVVY Code Camp

This folder contains an **Entity-Relationship** schema for the project so you can view and edit it in **Vuerd** (ERD Editor).

## What’s included

- **`schema.sql`** – SQL DDL (MySQL-compatible) for the app’s main entities:
  - **News & Updates:** `news_submissions`, `approved_news`
  - **Calendar:** `calendar_events`
  - **Courses:** `courses`
  - **Featured Projects:** `projects`
  - **User/Dashboard:** `profiles`, `notifications`

The structure matches the TypeScript interfaces in `app/composables/useDashboardApi.ts` and the data used by the Nuxt pages.

## How to open in Vuerd

### Option 1: Web (erd-editor.io)

1. Go to [https://erd-editor.io](https://erd-editor.io).
2. **File → Import → SQL DDL** (or drag & drop).
3. Choose **MySQL** (or MariaDB).
4. Paste the contents of `schema.sql` or select the file.
5. The diagram will be generated from the DDL.

### Option 2: VS Code extension

1. Install **“ERD Editor”** by dineug from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode).
2. Open `vuerd/schema.sql`.
3. Use the ERD Editor’s “Import SQL” (or open the ERD view and import the file).
4. Edit the diagram and export back to SQL if needed.

### Option 3: Use the schema in your DB

You can run `schema.sql` against a MySQL/MariaDB database to create the tables, then point your API or Nuxt app at that database. The file is a reference schema; adjust types and constraints to match your backend.

## Notes

- The app currently uses **localStorage** and optional **API** (see `useDashboardApi`); this ERD is a conceptual/data model that can back a real DB or API.
- To add relationships (e.g. `approved_news` → `news_submissions`), add `FOREIGN KEY` definitions in `schema.sql` and re-import into Vuerd.
