import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./pages/Home/home.route";

const routers = createBrowserRouter([...homeRoutes] as any);

export default routers;
