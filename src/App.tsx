import "./App.css";
import { Breeds } from "./Breeds";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p>
          <span role="img" aria-label="heart">
            ❤️
          </span>
          <span role="img" aria-label="dog">
            🐶
          </span>
        </p>
      </header>
      <Breeds />
    </div>
  );
}

export default App;
