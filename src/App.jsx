import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';
import Members from './pages/Members';
import Itinerary from './pages/Itinerary';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import Balances from './pages/Balances';
import Settlement from './pages/Settlement';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/trip/overview" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
            <Route path="/trip/:tripId" element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
            <Route path="/trip/:tripId/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/trip/:tripId/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
            <Route path="/trip/:tripId/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/trip/:tripId/expenses/new" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
            <Route path="/trip/:tripId/balances" element={<ProtectedRoute><Balances /></ProtectedRoute>} />
            <Route path="/trip/:tripId/settlements" element={<ProtectedRoute><Settlement /></ProtectedRoute>} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
