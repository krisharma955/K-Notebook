import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Background3D } from './components/Background3D';
import { Home } from './pages/Home';
import { Read } from './pages/Read';
import { Admin } from './pages/Admin';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans text-white relative">
      <Background3D />
      
      {/* 
        This is the main readable area constraint. 
        It naturally centers the application's content over the 3D canvas.
      */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-24 selection:bg-white/20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/read/:id" element={<Read />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
