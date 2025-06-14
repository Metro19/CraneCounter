import {Fieldset, Group, Stack, Text, ThemeIcon} from "@mantine/core";
import type {CountInfo} from "../../types/count_types.ts";
import {IconArchive, IconBarrierBlock, IconCalculator, IconHeartShare} from "@tabler/icons-react";



export default function CurrentCounts({currentCounts} : {currentCounts : CountInfo | null}) {
    if (currentCounts === null) {
        return (
            <Fieldset legend={"Current Counts"}>
                <Stack align={"center"} gap={"xs"}>
                    <IconBarrierBlock/>
                    <Text>The data could not be loaded.</Text>
                </Stack>
            </Fieldset>
        )
    }

    else {
        return (
            <Fieldset legend={"Current Counts"}>
                <Stack>
                    <Group gap={"xs"}>
                        <ThemeIcon><IconCalculator/></ThemeIcon>
                        <Text><b>{currentCounts.total}</b> Total</Text>
                    </Group>
                    <Group gap={"xs"}>
                        <ThemeIcon bg={"purple"}><IconHeartShare/></ThemeIcon>
                        <Text><b>{currentCounts.given_away}</b> Given Away</Text>
                    </Group>
                    <Group gap={"xs"}>
                        <ThemeIcon bg={"green"}><IconArchive/></ThemeIcon>
                        <Text><b>{currentCounts.on_hand}</b> On Hand</Text>
                    </Group>
                </Stack>
            </Fieldset>
        )
    }
}