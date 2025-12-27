---
description: Deploy the GraphQL API to Sanity
---

The "GraphQL" tab in your Studio might show "Not Deployed" initially. You need to deploy the schema to Sanity's servers manually once.

1.  **Login to Sanity** (if not already logged in):
    ```powershell
    npx sanity login
    ```

2.  **Deploy the GraphQL API**:
    ```powershell
    npx sanity graphql deploy
    ```
    - Select `default` if asked for a tag.
    - Confirm with `Y`.

3.  **Verify**:
    - Go back to your Studio Project Info or visit the URL provided in the terminal.
    - You should now see a green "Deployed" status.
    - Your GraphQL Playground in the Studio will now work.
