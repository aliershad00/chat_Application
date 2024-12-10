import "./App.css";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; //for seeing notification

function App() {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
