import "./App.css";
import { lazy, Suspense } from "react";
const Card = lazy(() => import("./components/Card"));
function App() {
  // src/index.js or src/App.js
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <Suspense fallback={<div className="suspence">Loading the App...</div>}>
        <Card />
      </Suspense>
    </div>
  );
}

export default App;
