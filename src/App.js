import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./component/Navbar/NavBar";
import AuthContext from "./context/authContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <AuthContext>
          <Nav />
        </AuthContext>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
