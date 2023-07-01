import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
