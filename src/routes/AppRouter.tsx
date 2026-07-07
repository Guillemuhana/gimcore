import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthInit } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Login from "@/modules/auth/pages/Login";
import Register from "@/modules/auth/pages/Register";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";

import Dashboard from "@/modules/dashboard/pages/Dashboard";
import Members from "@/modules/members/pages/Members";
import Payments from "@/modules/payments/pages/Payments";
import Trainers from "@/modules/trainers/pages/Trainers";
import Machines from "@/modules/machines/pages/Machines";
import Routines from "@/modules/routines/pages/Routines";
import Exercises from "@/modules/exercises/pages/Exercises";
import Progress from "@/modules/progress/pages/Progress";
import Reports from "@/modules/reports/pages/Reports";
import Settings from "@/modules/settings/pages/Settings";
import AiChat from "@/modules/ai/pages/AiChat";

export default function AppRouter() {
  useAuthInit();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai" element={<AiChat />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
