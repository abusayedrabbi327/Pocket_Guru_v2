import { useState, useCallback } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { AppProvider } from "./context/AppContext";
import { SplashScreen } from "./components/SplashScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { WelcomePage } from "./components/WelcomePage";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { OtpPage } from "./components/OtpPage";
import { HomePage } from "./components/HomePage";
import { TransactionsPage } from "./components/TransactionsPage";
import { AddTransactionPage } from "./components/AddTransactionPage";
import { ActivityPage } from "./components/ActivityPage";
import { AddGoalPage } from "./components/AddGoalPage";
import { BudgetPage } from "./components/BudgetPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { ProfilePage } from "./components/ProfilePage";
import { MainLayout } from "./components/MainLayout";
import { ConsultantsPage } from "./components/ConsultantsPage";
import { ConsultantProfilePage } from "./components/ConsultantProfilePage";
import { ChatPage } from "./components/ChatPage";
import { SubscriptionPage } from "./components/SubscriptionPage";
import { AdminPage } from "./components/AdminPage";
import { ConsultantDashboardPage } from "./components/ConsultantDashboardPage";
import { ConsultantSetupPage } from "./components/ConsultantSetupPage";
import { ConsultantClientsPage } from "./components/ConsultantClientsPage";
import { ConsultantMessagesPage } from "./components/ConsultantMessagesPage";
import { ConsultantSchedulePage } from "./components/ConsultantSchedulePage";
import { ConsultantOwnProfilePage } from "./components/ConsultantOwnProfilePage";

// Root layout that provides AppContext to all route components
function RootLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: WelcomePage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignUpPage,
      },
      {
        path: "/otp",
        Component: OtpPage,
      },
      {
        path: "/consultant-setup",
        Component: ConsultantSetupPage,
      },
      {
        Component: MainLayout,
        children: [
          // User routes
          { path: "/home", Component: HomePage },
          { path: "/transactions", Component: TransactionsPage },
          { path: "/add-transaction", Component: AddTransactionPage },
          { path: "/activity", Component: ActivityPage },
          { path: "/add-goal", Component: AddGoalPage },
          { path: "/budget", Component: BudgetPage },
          { path: "/analytics", Component: AnalyticsPage },
          { path: "/profile", Component: ProfilePage },
          { path: "/consultants", Component: ConsultantsPage },
          { path: "/consultant/:id", Component: ConsultantProfilePage },
          { path: "/chat/:sessionId", Component: ChatPage },
          { path: "/subscription", Component: SubscriptionPage },
          { path: "/admin", Component: AdminPage },
          // Consultant routes
          { path: "/consultant-dashboard", Component: ConsultantDashboardPage },
          { path: "/consultant-clients", Component: ConsultantClientsPage },
          { path: "/consultant-messages", Component: ConsultantMessagesPage },
          { path: "/consultant-schedule", Component: ConsultantSchedulePage },
          { path: "/consultant-profile", Component: ConsultantOwnProfilePage },
        ],
      },
    ],
  },
]);

function AppShell() {
  const [phase, setPhase] = useState<"splash" | "onboarding" | "app">(() => {
    if (typeof window !== "undefined" && (localStorage.getItem("pg_auth_user") || localStorage.getItem("pg_has_seen_onboarding"))) {
      return "app";
    }
    return "splash";
  });

  const handleSplashComplete = useCallback(() => {
    setPhase("onboarding");
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pg_has_seen_onboarding", "true");
    }
    setPhase("app");
  }, []);

  return (
    <div
      className="w-full h-dvh md:h-screen max-w-[430px] md:max-w-none mx-auto bg-white relative overflow-hidden md:shadow-none shadow-2xl flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {phase === "splash" && (
        <div className="w-full h-full max-w-[430px] mx-auto">
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      )}
      {phase === "onboarding" && (
        <div className="w-full h-full max-w-[430px] mx-auto">
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        </div>
      )}
      {phase === "app" && <RouterProvider router={router} />}
    </div>
  );
}

export default function App() {
  return (
    <div className="w-full min-h-dvh md:min-h-screen bg-slate-950 flex items-center justify-center">
      <AppShell />
    </div>
  );
}