import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import { ExpenseTracker } from "./pages/expense-tracker";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
