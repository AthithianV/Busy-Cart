import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./component/Navbar/NavBar";
import AuthContext from "./context/authContext";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import Form from "./pages/Form/Form";
import CustomProductContext from "./context/ProductContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <AuthContext>
          <Nav />
        </AuthContext>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/orders", element: <Order /> },
        { path: "/cart", element: <Cart /> },
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
      <CustomProductContext>
        <RouterProvider router={router}></RouterProvider>
      </CustomProductContext>
    </div>
  );
}

export default App;
