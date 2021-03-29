import { AppProviders } from "context";
import Screen from "./screens/Index";
function App() {
  return (
    <div className="App" style={{ width: "300px", margin: "100px auto" }}>
      <AppProviders>
        <Screen />
      </AppProviders>
    </div>
  );
}

export default App;
