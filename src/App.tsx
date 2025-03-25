import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AUTH } from "./context/hooks";
import Loading from "./components/ui/Loading";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./app/Home/page"));
const AuthPage = lazy(() => import("./app/Auth/page"));
const LoginPage = lazy(() => import("./app/Login/page"));

export default function App() {
  const { initialized } = AUTH.use();

  return (
    <Suspense fallback={<Loading message="페이지 로딩중" />}>
      {initialized && (
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index Component={HomePage} />
              <Route path="auth" Component={AuthPage} />
              <Route path="login" Component={LoginPage} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </Suspense>
  );
}
