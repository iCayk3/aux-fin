import Dashboard from "./page/dashboard/Dashboard"
import { Routes, Route, Router, BrowserRouter } from "react-router";
import MinhaDash from "./page/MinhaDash";
import Dashboard2 from "./page/Dashboard2";

function Wizard() {
  return (
    <div>
      <h1>Some Wizard with Steps</h1>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
      </Routes>
    </div>
  );
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="minhadash" element={<Dashboard2 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
