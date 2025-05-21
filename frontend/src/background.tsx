import {BackgroundImage, Center, Divider, Group, Paper, Stack} from "@mantine/core";
import bkdg from "/bkgd.jpg";
import wet from "/wet.jpg";
import Number from "./components/number.tsx";
import GivenAway from "./components/given_away.tsx";
import FoldedPerDay from "./components/folded_per_day.tsx";
import {useViewportSize} from "@mantine/hooks";
import PhoneMain from "./components/phone_main.tsx";
import Login from "./components/login.tsx";

export default function Background() {
    const {width} = useViewportSize();

    if (width > 1000) {
        return (
            <BackgroundImage src={bkdg} h={"100vh"}>
                <Center h={"100%"}>
                    <Paper h={"60%"} w={"60%"} radius={"xl"} withBorder>
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
                <Login/>
            </BackgroundImage>
        )
    }

    else {
        return (
            <BackgroundImage src={wet} h={"100vh"}>
                <Stack h={"100%"} justify={"center"} align={"center"}>
                    <Paper withBorder h={"55%"} w={"95%"} radius={"xl"} style={{display: "flex"}}>
                        <PhoneMain/>
                    </Paper>
                </Stack>
                <Login/>
            </BackgroundImage>
            )
    }
}