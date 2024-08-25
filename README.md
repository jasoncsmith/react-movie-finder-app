# Movie Finder App

## Technologies Used

- Vite
- Typescript
- React
- React Query
- Modular Sass
- Tailwind

### Proud of

- The `React Query` and custom hook implementation `useMovieFetcher`, to cache results. It is neat to see the delay when paginating forwards but when paginating backwards through the same result set the rendering is instant.
- Activated the `keepPreviousData` option to allow for a better UX when paginating.
- All the Typescript type safety.
- The `useMovieFinderApiContext`, to centralize state update logic to one place and give the app a Redux like API. See item 2 in "IF only I had more time..." below.
- Built a custom Layout component `FlexTwoColumn` where you can pass in different configuration options.
- Figured out a way to get total number of movies in DB by calling `movies/limit=1`.

### IF only I had more time 😅...

- Implement a way to debounce the search input change event, without introducing side-effects, to ensure a fast typer doesnt hit the DB unnecessarily.
- Combine `useReducer` and `ContextApi` to share state between related Movie Finder components, I committed the hook `useMovieFinderApiContext` but was not able to implement. I ran out of time and I was causing too many re-renders on the first implementation attempt, the `useEffect` that populates the
- Allow user to select items per page.
- I probably spent too much time on the design, but I just couldn't turn in an unstyled project 😅.
- I would make the components styling more flexible and scalable.
- Finish building out the rating UI and use half stars and empty stars with a proper icon library. Instead of using these: ⚫.
- Build out the tailwind config and index.scss file with more base styles.
- Add more accessibility features.
