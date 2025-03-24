import { BrowserRouter, Route, Routes } from "react-router-dom";
import page from "./app/Home/page";
import Authpage from "./app/Home/auth/page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index Component={page} />
          <Route path="auth" Component={Authpage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
