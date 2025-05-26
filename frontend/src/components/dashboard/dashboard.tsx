import {ActionIcon, Center, Group, Stack, Title} from "@mantine/core";
import {
    IconArrowBackUp, IconUserOff,
} from "@tabler/icons-react";
import {useNavigate} from "react-router";
import CurrentCounts from "./current_counts.tsx";
import CountModifiers from "./count_modifiers.tsx";
import {useEffect, useState} from "react";
import type {CountInfo} from "../../types/count_types.ts";
import {useLocalStorage} from "@mantine/hooks";

export default function Dashboard() {
    const navigate = useNavigate();

    const [currentCounts, changeCurrentCounts] = useState<CountInfo | null>({
        total: 0,
        given_away: 0,
        on_hand: 0
    });

    const [token, setTokenValue] = useLocalStorage({
        key: 'token',
        defaultValue: null,
    });

    // get the current crane count from the server
    useEffect(() => {
        if (token) {
            void fetch('/api/internal_counts', {method: "GET", headers: {"accept": "application/json", "Authorization": `Bearer ${token}`}})
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data: CountInfo) => {
                            changeCurrentCounts(data)
                        });
                    }
                    else if (response.status == 401) {
                        navigate("/");
                        setTokenValue(null);
                    }
                })
        }
    }, [navigate, setTokenValue, token]);
    
    return (
        <Center>
            <Stack>
                <Group justify={"center"}>
                    <Title>Dashboard</Title>
                    <ActionIcon onClick={() => {
                        navigate("/")
                    }}>
                        <IconArrowBackUp/>
                    </ActionIcon>
                    <ActionIcon bg={"red"} onClick={() => {
                        setTokenValue(null);
                        navigate("/")
                    }}>
                        <IconUserOff/>
                    </ActionIcon>
                </Group>
                <Group justify={"center"}>
                    <CurrentCounts currentCounts={currentCounts}/>
                    <CountModifiers changeCount={changeCurrentCounts}/>
                </Group>
            </Stack>
        </Center>
    )
}