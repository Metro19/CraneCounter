import './App.css'
import Background from "./background.tsx";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {BrowserRouter, Route, Routes} from 'react-router';
import Dashboard from "./components/dashboard/dashboard.tsx";

function App() {

    return (
        <MantineProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Background/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
