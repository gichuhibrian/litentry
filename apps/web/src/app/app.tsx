// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Dashboard from './pages/dashboard.pages';
import Login from './pages/login.pages';
import { Routes, Route, BrowserRouter } from "react-router-dom";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
