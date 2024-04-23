import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyUser } from "./features/user/user.action";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Listing from "./pages/Listing";
import Signup from "./pages/Signup";

export const Router = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(verifyUser())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {
          isLoggedIn ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/:city/:propertyType" element={<Properties />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
            :
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
        }
      </Routes>
    </BrowserRouter>
  );
};
