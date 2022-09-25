import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import "./styles/main.css";

import routes from "~react-pages";
import { Header } from "./components/Header";

function App() {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}

const app = createRoot(document.getElementById("root")!);

app.render(
  <Router>
    <Header />
    <App />
  </Router>
);
