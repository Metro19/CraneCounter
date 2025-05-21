import {ActionIcon, Button, Fieldset, Group, NumberInput, Stack} from "@mantine/core";
import {IconDialpadOff, IconHeartShare, IconLibraryPlus, IconPlus} from "@tabler/icons-react";

export default function CountModifiers() {
    return (
        <Stack>
            <Fieldset legend={"Add Cranes"}>
            <Stack>
                <Group grow>
                    <Button leftSection={<IconPlus/>} bg={"green"}>Add One</Button>
                </Group>
                <Group>
                    <NumberInput></NumberInput>
                    <ActionIcon size={"lg"}><IconLibraryPlus/></ActionIcon>
                </Group>
            </Stack>
            </Fieldset><Fieldset legend={"Fix Mistakes"}>
                <Group>
                    <NumberInput></NumberInput>
                    <ActionIcon size={"lg"} bg={"red"}><IconDialpadOff/></ActionIcon>
                </Group>
            </Fieldset><Fieldset legend={"Give Away Cranes"}>
                <Group>
                    <NumberInput></NumberInput>
                    <ActionIcon size={"lg"} bg={"purple"}><IconHeartShare/></ActionIcon>
                </Group>
            </Fieldset>
        </Stack>
    )
}