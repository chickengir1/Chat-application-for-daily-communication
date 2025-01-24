import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/ui/Layout";
import SignupPage from "./pages/SignupPage";
import SettingPage from "./pages/SettingPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import NotificationsPage from "./pages/Notifications";

import AuthProvider from "./providers/AuthProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <ChatPage />
              </Layout>
            }
          />
          <Route
            path="/notifications"
            element={
              <Layout>
                <NotificationsPage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SettingPage />
              </Layout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findpassword" element={<FindPasswordPage />} />
          <Route path="/changepassword" element={<ChangePasswordPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
