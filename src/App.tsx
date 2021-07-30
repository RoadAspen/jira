import { AuthicatedApp } from "./authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthicatedApp } from "unauthenicated-app";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">{user ? <AuthicatedApp /> : <UnauthicatedApp />}</div>
  );
}

export default App;
