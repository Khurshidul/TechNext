import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchContextProvider from "./components/context/appContext";
import Loading from "./components/Loading/Loading";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <React.Suspense fallback={<Loading />}>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </React.Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
