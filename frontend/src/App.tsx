import './App.css'
import Background from "./background.tsx";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';

function App() {

    return (
        <MantineProvider>
            <Background/>
        </MantineProvider>
    )
}

export default App
