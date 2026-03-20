# Feature Recommendations

Prioritised improvements for the Movie Finder Widget, ordered by impact vs effort.

---

## 🔴 High priority

### 1. Infinite scroll / pagination
The IntersectionObserver div is already in the DOM. Wire it up to fetch the next page as the user approaches the bottom of the results list. TMDB returns up to 500 pages per query — there's plenty of room to grow.

### 2. Detail pages / drawer
Clicking a card currently does nothing. Add a slide-in drawer or dedicated route (`/movie/:id`, `/tv/:id`) that shows:
- Full overview, genres, runtime
- Cast list with profile images
- Similar titles carousel
- Streaming availability (via TMDB's watch providers endpoint)

### 3. Search-as-you-type
Debounce the search input (300 ms) and trigger live results without requiring the user to press "Search". Show a loading indicator inside the input.

### 4. Watchlist / favourites
Persist a local watchlist using `localStorage` (or IndexedDB for larger lists). A heart icon on each card toggles the item. Add a "Watchlist" filter pill. For logged-in users this could sync to a backend.

---

## 🟡 Medium priority

### 5. Routing (React Router)
Add `react-router-dom` for shareable URLs. Deep links like `/search?q=inception&filter=movie` let users share results or bookmark searches.

### 6. Advanced filters
TMDB exposes genre IDs, year ranges, and sort options. A collapsible "Advanced" panel could expose:
- Genre multi-select (pulled from `/genre/movie/list`)
- Year range slider
- Sort: Popularity, Rating, Release date

### 7. AI feature upgrades
The current PoC calls OpenRouter with a simple prompt. Next steps:
- **Upgrade to a better free model** once available on OpenRouter (e.g. Llama 3.3 70B free tier).
- **Streaming responses** — use the OpenRouter SSE API to stream text token-by-token for a snappier feel.
- **Search integration** — after AI generates recommendations, offer a one-click "Find in TMDB" button that triggers a search for that title.
- **Context enrichment** — pass the actual titles visible on screen into the AI prompt, not just the search term.
- **User preference memory** — store liked/disliked suggestions in `localStorage` and include them in subsequent prompts.

### 8. Dark/light mode toggle
The dark theme is default. Respect `prefers-color-scheme` via a CSS media query and expose a manual toggle stored in `localStorage`.

### 9. Trailer improvements
- Check for trailer availability client-side before rendering the button (cache results).
- Support multiple trailers — show a selector if more than one is available.
- Add a "Clip" or "Teaser" fallback when no official trailer is found.

---

## 🟢 Lower priority / polish

### 10. Skeleton shimmer matching the grid layout
The current skeleton cards are linear. Once grid view is implemented at larger breakpoints, generate skeleton cards sized to match poster columns.

### 11. Keyboard navigation
Add arrow-key navigation between cards, `Enter` to open detail, `/` to focus search. Helps power users and improves accessibility.

### 12. PWA offline support
A service worker (Vite PWA plugin) could cache the TMDB configuration and trending results, letting the app render in poor network conditions.

### 13. Analytics / telemetry
Add a privacy-respecting analytics layer (e.g. Plausible or Vercel Analytics) to understand which features get used, which searches are most common, and where users drop off.

### 14. Test coverage
Add Vitest + React Testing Library. Priority tests:
- `services.ts` API calls (mock axios)
- `utils.ts` type guards
- `SearchBar` form submission
- `FilterOptions` pill selection

---

## TMDB attribution requirements

Per the [TMDB API Terms of Use](https://www.themoviedb.org/documentation/api/terms-of-use):
- ✅ Display the notice "This product uses the TMDB API but is not endorsed or certified by TMDB."
- ✅ Show the TMDB logo (currently in the header and attribution bar)
- ✅ Link data back to TMDB where applicable

**Additional best practices:**
- Link each movie/TV show title to its TMDB page (`https://www.themoviedb.org/movie/:id` or `/tv/:id`).
- Link each person name to their TMDB profile (`https://www.themoviedb.org/person/:id`).
- Do not cache TMDB data for longer than permitted (refer to your API plan terms).
