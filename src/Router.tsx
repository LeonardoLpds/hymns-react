import { createBrowserRouter } from "react-router-dom";
import AddHymn from "./pages/AddHymn/AddHymn";
import Root from "./pages/Root/Root";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <AddHymn /> }],
  },
]);
