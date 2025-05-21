import {ActionIcon, Center, Group, Stack, Title} from "@mantine/core";
import {
    IconArrowBackUp,
} from "@tabler/icons-react";
import {useNavigate} from "react-router";
import CurrentCounts from "./current_counts.tsx";
import CountModifiers from "./count_modifiers.tsx";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <Center>
            <Stack>
                <Group justify={"center"}>
                    <Title>Dashboard</Title>
                    <ActionIcon onClick={() => {
                        navigate("/")
                    }}><IconArrowBackUp/></ActionIcon>
                </Group>
                <Group justify={"center"}>
                    <CurrentCounts/>
                    <CountModifiers/>
                </Group>
            </Stack>
        </Center>
    )
}