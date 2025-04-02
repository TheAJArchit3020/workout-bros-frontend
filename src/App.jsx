import "./App.css";
import Routing from "./common/routing";
import usePWAInstall from "./hooks/usePWAInstall";

function App() {
  const { deferredPrompt, handleInstallClick } = usePWAInstall();

  return (
    <>
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
      <Routing />
    </>
  );
}

export default App;
