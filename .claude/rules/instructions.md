# Debugging Instructions

When debugging or investigating issues, **use MCP tools to inspect the running application** instead of just reading code.

## When to Use MCP Tools

- User asks to debug, see issues, or check what's happening
- User mentions problems with UI, behavior, or runtime errors
- You need to verify assumptions about how the app is actually working

## Protocol

1. **Load tools first**: Use `ToolSearch` to load MCP tools before calling them
2. **Playwright**: For browser inspection (screenshots, interaction, console, network)
   - `select:mcp__playwright__browser_navigate,mcp__playwright__browser_screenshot`
3. **Next.js DevTools**: For Next.js specific debugging
   - `select:mcp__next-devtools-mcp__nextjs_call`

## Priority

Always inspect the actual running app over speculating from code. Take screenshots, check console messages, and verify real behavior.
