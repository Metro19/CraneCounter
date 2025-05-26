import {Button, Fieldset, Group, NumberInput, Stack} from "@mantine/core";
import {IconDeviceFloppy, IconDialpadOff, IconHeartShare, IconLibraryPlus, IconPlus} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import type {Dispatch} from "react";
import type {CountInfo} from "../../types/count_types.ts";
import {useLocalStorage} from "@mantine/hooks";

function submitForm(values: {multiAdd: number, fixMistake: number, giveAway: number}, token: string,
                    changeCount: Dispatch<CountInfo | null>) {
    void fetch('/api/change_counts?' + new URLSearchParams({"add": values.multiAdd.toString(), "subtract": values.fixMistake.toString(), "give_away": values.giveAway.toString()}),
        {method: "POST",
        headers: {"accept": "application/json", "Authorization": `Bearer ${token}`}})
        .then((response) => {
            if (response.ok) {
                response.json().then((data: CountInfo) => {
                    changeCount(data)
                });
            }
        })
}

export default function CountModifiers({changeCount} : {changeCount: Dispatch<CountInfo | null>}) {
    const [token] = useLocalStorage({
        key: 'token',
        defaultValue: null,
    });

    const form = useForm({
        initialValues: {
            multiAdd: 0,
            fixMistake: 0,
            giveAway: 0
        },

        validate: {
            multiAdd: (value) => (value >= 0 ? null : "Must be greater than 0"),
            fixMistake: (value) => (value >= 0 ? null : "Must be greater than 0"),
            giveAway: (value) => (value >= 0 ? null : "Must be greater than 0")
        }
    })

    if (token) {
        return (
            <Stack>
                <form onSubmit={form.onSubmit((values) => {
                    submitForm(values, token, changeCount);
                    form.reset()})
                }>
                    <Fieldset legend={"Add Cranes"}>
                    <Stack>
                        <Group grow>
                            <Button leftSection={<IconPlus/>} bg={"green"}>Add One</Button>
                        </Group>
                        <Group>
                            <NumberInput
                                leftSection={<IconLibraryPlus/>}
                                {...form.getInputProps("multiAdd")}
                            />
                        </Group>
                    </Stack>
                    </Fieldset><Fieldset legend={"Fix Mistakes"}>
                        <Group>
                            <NumberInput
                                leftSection={<IconDialpadOff/>}
                                {...form.getInputProps("fixMistake")}
                            />
                        </Group>
                    </Fieldset><Fieldset legend={"Give Away Cranes"}>
                        <Group>
                            <NumberInput
                                leftSection={<IconHeartShare/>}
                                {...form.getInputProps("giveAway")}
                            />
                        </Group>
                    </Fieldset>
                    <Group pt={"1rem"} grow>
                        <Button type={"submit"} bg={"green"} leftSection={<IconDeviceFloppy/>}>Submit</Button>
                    </Group>
                </form>
            </Stack>
        )
    }
}