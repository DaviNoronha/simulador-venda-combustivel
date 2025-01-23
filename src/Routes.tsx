import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from './pages/Home';
import Venda from './pages/Venda';
import Relatorio from './pages/Relatorio';
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

export function AppRoutes() {
    return (
        <Router>
            <Navbar></Navbar>

            <Container maxWidth={false}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/venda" element={<Venda />} />
                    <Route path="/relatorio" element={<Relatorio />} />
                </Routes>
            </Container>
        </Router>
    );
}