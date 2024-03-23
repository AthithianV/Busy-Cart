import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./component/Navbar/NavBar";
import AuthContext from "./context/authContext";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import Form from "./pages/Form/Form";
import CustomProductContext from "./context/ProductContext";
import CustomCartContext from "./context/cartContext";
import CustomOrderContext from "./context/orderContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      errorElement: <ErrorPage />,
      element: (
        <AuthContext>
          <Nav />
        </AuthContext>
      ),
      children: [
        {
          index: true,
          element: (
            <AuthContext>
              <CustomCartContext>
                <Home />
              </CustomCartContext>
            </AuthContext>
          ),
        },
        {
          path: "/orders",
          element: (
            <AuthContext>
              <CustomOrderContext>
                <Order />
              </CustomOrderContext>
            </AuthContext>
          ),
        },
        {
          path: "/cart",
          element: (
            <AuthContext>
              <CustomCartContext>
                <Cart />
              </CustomCartContext>
            </AuthContext>
          ),
        },
        {
          path: "/sign-in",

          element: (
            <AuthContext>
              <Form forSignIn={true} />
            </AuthContext>
          ),
        },
        {
          path: "/sign-up",
          element: (
            <AuthContext>
              <Form forSignIn={false} />
            </AuthContext>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <ToastContainer position="bottom-right" />
      <CustomProductContext>
        <RouterProvider router={router}></RouterProvider>
      </CustomProductContext>
    </div>
  );
}

export default App;
