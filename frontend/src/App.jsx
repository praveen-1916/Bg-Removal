import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import BackgroundRemoving from "./pages/BackgroundRemoving";
import BuyCredits from "./pages/BuyCredits";
import BgRemoval from "./context/BgRemoval";

function App() {
  return (
    <>
      <Router>
        <BgRemoval>
          <div className="bg-gradient-to-b from-[#F2FFF9] to-[#FFF6F1]">
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/bg-remove" element={<BackgroundRemoving />} />
              <Route exact path="buy-credits" element={<BuyCredits />} />
            </Routes>
            <Footer />
          </div>
        </BgRemoval>
      </Router>
    </>
  );
}

export default App;
