import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <div>Root page</div>,
    children: [{ index: true, element: <div>Index page</div> }],
  },
]);
