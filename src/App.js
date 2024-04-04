import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./component/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import Form from "./pages/Form/Form";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/Error/ErrorPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authChange } from "./redux/reducer/userReducer/userReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authChange());
  }, [dispatch]);

  // Router is created.
  const router = createBrowserRouter([
    {
      path: "",
      errorElement: <ErrorPage />,
      element: <Nav />,
      children: [
        {
          index: true,
          element: (
                <Home />
          ),
        },
        {
          path: "/orders",
          element: (
                <Order />
          ),
        },
        {
          path: "/cart",
          element: (
                <Cart />
          ),
        },
        {
          path: "/sign-in",

          element: (
              <Form forSignIn={true} />
          ),
        },
        {
          path: "/sign-up",
          element: (
              <Form forSignIn={false} />
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {/* router is pass a props to Router provider. */}

      <ToastContainer position="top-center" />
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
