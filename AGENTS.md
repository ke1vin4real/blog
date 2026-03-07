## Project Overview

This is a **Next.js 16 blog website** featuring a collection of technical articles. The blog uses MDX for content authoring, React Server Components for data fetching, and includes dark mode theme support with Giscus comments.

**Key Stack:**
- Next.js 16.0.10 with App Router
- React 19 with Server Components
- TypeScript 5.7
- MDX with plugins (remark-gfm for GitHub markdown, rehype-highlight for code highlighting)
- styled-jsx for component styling
- Giscus for blog comments

## Development Commands

```bash
# Start development server (hot reload on file changes)
pnpm dev

# Run TypeScript type checking without emitting
pnpm ts-check

# Run ESLint to check code style
pnpm lint

# Build for production
pnpm build

# Start production server (requires build first)
pnpm start

# Build and start in one command
pnpm prod

# Commit with commitizen interactive prompt
pnpm commit
```

## Architecture and Structure

### App Router Structure (`/app`)
- `page.tsx` - Home page listing all blog posts
- `layout.tsx` - Root layout with theme setup, global CSS injection, and layout components
- `blog/[slug]/page.tsx` - Dynamic blog post pages (generated from `/posts` MDX files)
- `about/page.tsx` - About page
- `db/blog.ts` - Blog data fetching and caching logic
- `registry.tsx` - StyleRegistry for styled-jsx

### Components (`/components`)
Each component uses styled-jsx for scoped CSS:
- `Layout/` - Main app layout wrapper with sticky navigation, theme management, and footer
- `Posts/` - Blog post list component showing all published posts
- `MDXContent/` - MDX content wrapper with post title and date display
- `Comments/` - Giscus-based comment section
- `ThemeSelection/` - Theme selector dropdown (Light/Dark/System)

### Blog Content (`/posts`)
- MDX files with `.mdx` extension
- Each post requires metadata frontmatter:
  ```javascript
  export const metadata = {
    title: "Post Title",
    description: "Short description",
    date: "2025-01-01",
    image: "/images/posts/slug/cover.jpg",
    slug: "post-slug"
  }
  ```
- Posts are automatically sorted by date (newest first) via `getAllPosts()` in `app/db/blog.ts`

### Utilities (`/utils`)
- `constant.ts` - Constants (GITHUB_HOMEPAGE, MAIL, HOST domain)
- `theme.ts` - Theme types and constants
- `func.ts` - Helper functions
- `global.css` - Global styles (injected via `fs.readFileSync()` in layout.tsx)
- `custom.d.ts` - TypeScript type definitions

## Key Technical Patterns

### Next.js Cache Components
The app uses **Next.js Cache Components** (cacheComponents: true in next.config.mjs):
- Functions marked with `'use cache'` and `cacheLife()` directives enable aggressive caching
- Example: `getAllPosts()` in `app/db/blog.ts` uses `'use cache'` with `cacheLife('days')`
- This improves performance by caching expensive operations

### Dynamic Routes
- Blog posts use dynamic segments: `/blog/[slug]`
- `generateStaticParams()` generates static pages for all blog posts at build time
- No `dynamicParams: true` to maintain compatibility with Cache Components

### Theme Management
- **Theme State**: Stored in localStorage with key `'ke1vin-blog-theme'`
- **Preload Script**: Inline script in `app/layout.tsx` (id="script-add-theme") reads theme before React hydration to prevent flash of unstyled content
- **Theme Values**: LIGHT, DARK, SYSTEM (detects OS preference via matchMedia)
- **CSS Class**: `dark-theme` class on `<html>` element toggles dark mode
- **CSS Variables**: Theme colors defined in global.css as CSS variables (e.g., `--nav-background-color`)

### Styling Approach
- **styled-jsx** for component-scoped styling (CSS-in-JS)
- Global styles in `utils/global.css` (injected at build time)
- CSS variables for theme colors
- Responsive design with media queries (768px breakpoint for desktop)

### MDX Processing
- **remark-gfm**: Enables GitHub-flavored markdown features
- **rehype-highlight**: Adds syntax highlighting to code blocks
- Posts are imported dynamically and must export `metadata` and a default component

## Important Considerations

### Next.js 16 Cache Components Compatibility
- No `dynamicParams: true` in dynamic routes - incompatible with Cache Components
- No `output: 'export'` in next.config.mjs - incompatible with Cache Components
- Use `'use cache'` directives strategically in Server Components

### Theme Flash Prevention
The inline theme script in `app/layout.tsx` runs BEFORE React hydration to prevent theme flash. Do NOT move this script or the localStorage logic.

### SVG Handling
SVGs in `/svgs` are inlined in components using `dangerouslySetInnerHTML`. This is configured in next.config.mjs with turbopack rules.

### TypeScript Configuration
- `strict: true` - Full strict mode enabled
- `noUnusedLocals: true` - Unused variables cause errors
- `noUnusedParameters: true` - Unused parameters cause errors
- Incremental compilation enabled for faster rebuilds

## Common Development Tasks

### Adding a New Blog Post
1. Create a new `.mdx` file in `/posts` directory (e.g., `my-post.mdx`)
2. Add required metadata at the top:
   ```javascript
   export const metadata = {
     title: "My Post Title",
     description: "Brief description",
     date: "2025-03-02",
     image: "/images/posts/my-post/cover.jpg",
     slug: "my-post"
   }
   ```
3. Write MDX content below the metadata
4. Add post images to `/public/images/posts/[slug]/`
5. No need to restart dev server - Next.js revalidates automatically

### Adding a New Component
1. Create folder in `/components/ComponentName/`
2. Create `index.tsx` file
3. Use styled-jsx for styling within component
4. Export as default export
5. Import and use in pages

### Updating Styling
- Component-scoped styles: Use styled-jsx blocks in components
- Global styles: Edit `/utils/global.css`
- Theme colors: Define as CSS variables in global.css, use `var(--color-name)` in styled-jsx

### Checking Type Errors
```bash
pnpm ts-check
```
This runs `tsc --noEmit` to find TypeScript errors without generating output files.

## Build and Deployment

- Production builds use `next build` which:
  - Generates static pages for all blog posts (via `generateStaticParams`)
  - Applies Cache Components optimization
  - Outputs to `.next/` directory
- The app can be deployed to Vercel (see README.md)
- Node.js ≥ 20.0.0 required (see engines in package.json)
