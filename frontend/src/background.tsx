import {BackgroundImage, Center, Divider, Group, Paper, Stack} from "@mantine/core";
import bkdg from "../public/bkgd.jpg";
import Number from "./components/number.tsx";
import GivenAway from "./components/given_away.tsx";
import FoldedPerDay from "./components/folded_per_day.tsx";

export default function Background() {
    return (
        <BackgroundImage src={bkdg} h={"100vh"}>
            <Center h={"100%"}>
                <Paper h={"50%"} w={"60%"} radius={"xl"} withBorder>
                    <Center h={"100%"} opacity={"100%"}>
                        <Stack w={"75%"}>
                            <Number/>
                            <Divider my={"md"}/>
                            <Group justify={"center"}>
                                <GivenAway/>
                                <Divider orientation={"vertical"} m={"1rem"}/>
                                <FoldedPerDay/>
                            </Group>
                        </Stack>
                    </Center>
                </Paper>
            </Center>
        </BackgroundImage>
    )
}