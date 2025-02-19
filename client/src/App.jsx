import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SettingPage from "./pages/SettingPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js"

function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });
  
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if(isCheckingAuth && !authUser) {
    return(<>
    <span className="loading loading-ring loading-xl"></span>
    </>)
  }

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
