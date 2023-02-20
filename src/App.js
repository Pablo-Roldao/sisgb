import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div id='app-container'>
        <Outlet />
      </div>
    </>
  );
}

export default App;
