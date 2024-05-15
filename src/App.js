import "./App.css";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  return (
    <div className="App">
      <LoadingComponent open={true} />
      <header className="App-header">
        <p>Driver Management System</p>
      </header>
    </div>
  );
}

export default App;
