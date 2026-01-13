import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PurchasePage from './pages/PurchasePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div style={{ background: '#0a0b10', minHeight: '100vh', color: 'white' }}>
      <nav style={{ padding: '20px', borderBottom: '1px solid #333' }}>
        <Link to="/" style={{ color: 'red', fontWeight: 'bold', marginRight: '20px' }}>CINEMA</Link>
        <Link to="/register" style={{ color: 'white', marginRight: '20px' }}>Registro</Link>
        <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/purchase/:id" element={<PurchasePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div><h1>Not Found</h1></div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
