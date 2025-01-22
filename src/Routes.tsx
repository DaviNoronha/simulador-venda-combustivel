import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";

import Index from './pages/Index';
import Venda from './pages/Venda';

export function AppRoutes() {
    return (
        <Router>
            <nav className="p-4 bg-gray-200">
                {/* Links para navegação */}
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/index" className="text-blue-500 hover:underline">
                            Index
                        </Link>
                    </li>
                    <li>
                        <Link to="/venda" className="text-blue-500 hover:underline">
                            Venda
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="/index" replace />} />
                <Route path="/index" element={<Index />} />
                <Route path="/venda" element={<Venda />} />
            </Routes>
        </Router>
    );
}