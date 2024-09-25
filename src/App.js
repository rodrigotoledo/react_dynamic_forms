import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormSchemas from './components/FormSchemas';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="mx-auto mt-28 px-5">
        <Routes>
          <Route path="/" element={<FormSchemas />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;