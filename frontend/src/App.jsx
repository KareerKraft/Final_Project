import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import useGetAppliedJobs from './hooks/useGetAppliedJob'
import Intro from "./landing/pages/Intro";
import Explore from "./landing/pages/Home";
import AboutUs from "./landing/pages/AboutUs";
import Help from "./landing/pages/Help";
import RoleSelect from "./pages/RoleSelect";
import LandingLayout from "./landing/LandingLayout";  


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <LandingLayout>
        <Intro />
      </LandingLayout>
    )
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/aboutus',
    element: <AboutUs />
  },
  {
    path: '/help',
    element: <Help />
  },
  {
    path: '/role',
    element: <RoleSelect />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },

])
function App() {
  // Load all applied jobs when app initializes
  useGetAppliedJobs();

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
