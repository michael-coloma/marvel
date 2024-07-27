import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter as App } from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import reportWebVitals from "./reportWebVitals";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoriteCharactersProvider } from "src/marvel/adapters/secondary/providers/FavoriteCharactersProvider";
import { ShowFavoritesProvider } from "src/marvel/adapters/secondary/providers/ShowFavoritesCharactersProvider";

import "./index.css";

const TIME_CACHE_MS = 1000 * 60 * 60 * 24; // 24 hours

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TIME_CACHE_MS, // 24 hours until second fetch for update cache with new request
      gcTime: TIME_CACHE_MS,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  key: "MARVEL_CACHE",
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: TIME_CACHE_MS,
  buster: "buildHash",
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavoriteCharactersProvider>
        <ShowFavoritesProvider>
          <App />
        </ShowFavoritesProvider>
      </FavoriteCharactersProvider>
      {/*To debug cache */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
