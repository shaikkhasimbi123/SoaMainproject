import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import MyCourses from "./pages/MyCourses";
import EnrollmentHistory from "./pages/EnrollmentHistory";
import PaymentPage from "./pages/PaymentPage";
import Receipt from "./pages/Receipt";
import StudentProfile from "./pages/StudentProfile";
import Notifications from "./pages/Notifications";

// Instructor Pages
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorCourses from "./pages/InstructorCourses";
import InstructorStudents from "./pages/InstructorStudents";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageCourses from "./pages/ManageCourses";
import ManageUsers from "./pages/ManageUsers";
import ManageEnrollments from "./pages/ManageEnrollments";
import ManagePayments from "./pages/ManagePayments";
import Reports from "./pages/Reports";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { EnrollmentProvider } from "./context/EnrollmentContext";
import { PaymentProvider } from "./context/PaymentContext";

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <CourseProvider>
            <EnrollmentProvider>
              <PaymentProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes with PublicLayout */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/courses" element={<CourseCatalog />} />
                      <Route path="/courses/:id" element={<CourseDetails />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Student Dashboard Routes */}
                    <Route
                      path="/student"
                      element={
                        <ProtectedRoute allowedRoles={["student"]}>
                          <DashboardLayout role="student" />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Navigate to="/student/dashboard" replace />} />
                      <Route path="dashboard" element={<StudentDashboard />} />
                      <Route path="courses" element={<MyCourses />} />
                      <Route path="enrollments" element={<EnrollmentHistory />} />
                      <Route path="payments" element={<PaymentPage />} />
                      <Route path="receipt/:paymentId" element={<Receipt />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="profile" element={<StudentProfile />} />
                    </Route>

                    {/* Instructor Dashboard Routes */}
                    <Route
                      path="/instructor"
                      element={
                        <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                          <DashboardLayout role="instructor" />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Navigate to="/instructor/dashboard" replace />} />
                      <Route path="dashboard" element={<InstructorDashboard />} />
                      <Route path="courses" element={<InstructorCourses />} />
                      <Route path="students" element={<InstructorStudents />} />
                    </Route>

                    {/* Admin Dashboard Routes */}
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <DashboardLayout role="admin" />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="courses" element={<ManageCourses />} />
                      <Route path="users" element={<ManageUsers />} />
                      <Route path="enrollments" element={<ManageEnrollments />} />
                      <Route path="payments" element={<ManagePayments />} />
                      <Route path="reports" element={<Reports />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </PaymentProvider>
            </EnrollmentProvider>
          </CourseProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
