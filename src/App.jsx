import "./App.css";
import { UsersProvider } from "./common/context";
import Routing from "./common/routing";
import ReactGA from "react-ga4";

function App() {
  ReactGA.initialize("G-NKL77RRV15");
  // const { deferredPrompt, handleInstallClick } = usePWAInstall();

  return (
    <>
      <UsersProvider>
        <Routing />
      </UsersProvider>
      {/* {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          style={{
            
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
            width: "90%",
          }}
        >
          Add to Home Screen
        </button>
      )} */}
    </>
  );
}

export default App;
