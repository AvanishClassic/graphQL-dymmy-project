import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../domain/home/home";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path="/" element={<Home />} />
      <Route path="*" element={<h1>Wrong page</h1>} />
    </Route>
  )
);

export default routes;
