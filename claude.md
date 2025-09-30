# Claude Code Instructions

## Git Commit Policy

For every full change or feature completion, you MUST:
1. Create a meaningful commit message that describes the change
2. Commit the changes using git
3. Push to the remote repository

### Commit Message Format
- Use descriptive, imperative mood (e.g., "Fix test validation logic" not "Fixed" or "Fixes")
- Be specific about what was changed
- Reference issue numbers if applicable

### When to Commit
- After completing a distinct feature or fix
- After fixing a bug
- Before moving to the next major task
- When a logical unit of work is complete

## Example
```bash
git add .
git commit -m "Fix test validation to actually run code against test cases"
git push
```
