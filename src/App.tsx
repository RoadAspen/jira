import { AuthicatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthicatedApp } from "unauthenicated-app";
function App() {
  const { user } = useAuth();
  return (
    <div className="App" style={{ width: "300px", margin: "100px auto" }}>
      {user ? <AuthicatedApp /> : <UnauthicatedApp />}
    </div>
  );
}

export default App;
