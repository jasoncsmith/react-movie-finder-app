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
- The `useMovieFinderApiContext`, to centralize state update logic to one place and give the app a Redux like API. See item 2 in **"IF only I had more time..."** below.
- Activated the `keepPreviousData` option to allow for a better UX when paginating.
- All the Typescript type safety.
- How the components look clean in `MovieFinder` they receive their props through hooks.
- Built a custom Layout component `FlexTwoColumn` where you can pass in different configuration options.
- Figured out a way to get total number of movies in DB by calling `movies/limit=1`.

### IF only I had more time 😅...

- Implement a way to debounce the search input change event, without introducing side-effects, to ensure a fast typer doesnt hit the DB unnecessarily.
- The `useMovieFinderApiContext` had too muuch overlap with the `useMovieFetcher` and I didnt have enough time to manage their responsibility overlap. I also wasnt able to use the `setSearchParams` method from the `useSearchParams` hook in the reducer logic, so I had to keep validation logic that I wanted in the reducer, in the component. I would research to see if we could `setSearchParams` from the reducer without triggering a page reload.
- Write some unit tests.
- Allow user to select items per page.
- I probably spent too much time on the design, but I just couldn't turn in an unstyled project 😅.
- I would make the components styling more flexible and scalable.
- Finish building out the rating UI and use half stars and empty stars with a proper icon library. Instead of using these: ⚫.
- Build out the tailwind config and index.scss file with more base styles.
- Add more accessibility features.
