import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMeThunk } from "../../store/authSlice";
import { fetchCart } from "../../store/cartSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeThunk()).then((result) => {
      if (getMeThunk.fulfilled.match(result)) {
        dispatch(fetchCart());
      }
    });
  }, [dispatch]);

  return children;
}

export default AuthInitializer;