import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Index from './pages/Index';
import Venda from './pages/Venda';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/index" element={<Index />} />
                <Route path="/venda" element={<Venda />} />
            </Routes>
        </Router>
    );
}