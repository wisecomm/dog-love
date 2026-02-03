---
description: Changeset verification and commit workflow (Build -> Lint -> Commit -> Push)
---

This workflow ensures that all changes are verified before being committed and pushed to the repository.

1.  **Verify Project Integrity**
    - Run build to ensure no compilation errors.
    - If in `frontend`: `pnpm build`
    - If in `backend`: `./gradlew build -x test` (Skip tests for speed unless critical)
    - If strictly required, run lint: `pnpm lint` (frontend)

2.  **Check Git Status**
    - Run `git status` to see staged/unstaged files.
    - Run `git diff --stat` to review summary of changes.

3.  **Commit Changes**
    - Stage files: `git add .` (or specific files)
    - Commit with a descriptive Conventional Commit message: `git commit -m "type: description"`
    - Example types: `feat`, `fix`, `refactor`, `chore`, `docs`.

4.  **Sync with Remote**
    - Drag latest changes mostly to avoid conflicts: `git pull --rebase`

5.  **Push Changes**
    - Push to the current branch: `git push`
