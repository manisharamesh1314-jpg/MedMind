import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { InsightsPage } from './pages/InsightsPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { RecordsPage } from './pages/RecordsPage'
import { RegisterPage } from './pages/RegisterPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
