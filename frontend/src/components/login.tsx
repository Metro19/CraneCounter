import {Affix, Button, Group, Modal, Paper, PasswordInput, Skeleton, Stack, Text, TextInput} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {IconAlertTriangle, IconDashboard, IconSquareX, IconUser, IconUserCheck} from '@tabler/icons-react';
import { useState } from "react";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router";

interface OAuthToken {
    access_token: string;
    token_type: string;
}

export default function Login() {
    const [value, setValue] = useLocalStorage({
        key: 'token',
        defaultValue: null,
    });
    const [skeleton, changeSkeleton] = useState<boolean>(false);
    const [error, changeError] = useState<string | null>(null);

    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (value != "" ? null : 'Invalid email'),
            password: (value) => (value != "" ? null : 'Invalid password'),
        },
    });

    const [modalOpened, setModalOpened] = useState<boolean>(false);

    return (
        <>
            <Modal opened={modalOpened} onClose={() => {setModalOpened(false)}} title="Log-In">
                <form onSubmit={form.onSubmit((values) => {
                    changeSkeleton(true);
                    void fetch('/api/token', {method: "POST", body: `grant_type=password&username=${values.username}&password=${values.password}`, headers: {"accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}})
                        .then((response) => {
                            if (response.ok) {
                                response.json().then((data: OAuthToken) => {
                                    // @ts-expect-error setValue accepts string here
                                    setValue(data.access_token);
                                    setModalOpened(false);
                                    changeError(null);
                                    form.reset();
                                });
                            }
                            else {
                                changeError("Invalid username or password.")
                                changeSkeleton(false);
                                throw new Error("Invalid credentials");
                            }
                        })
                })}>
                    <Stack>
                        {error &&
                            <Paper pt={".5rem"} pb={".5rem"} pl={"xs"} bg={"red"}>
                                <Group align={"center"}>
                                    <IconAlertTriangle/>
                                    <Text>{error}</Text>
                                </Group>
                            </Paper>
                        }
                        <TextInput
                            label="Username"
                            placeholder="rpxshark"
                            {...form.getInputProps('username')}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder=""
                            {...form.getInputProps('password')}
                        />
                        <Group grow>
                            <Skeleton animate visible={skeleton}>
                                <Button w={"100%"} type={"submit"} bg={"green"} leftSection={<IconUserCheck/>}>Sign-In</Button>
                            </Skeleton>
                            <Skeleton animate visible={skeleton}>
                                <Button w={"100%"} type={"reset"} bg={"red"} leftSection={<IconSquareX/>}>Clear</Button>
                            </Skeleton>
                        </Group>
                    </Stack>
                </form>
            </Modal>
            <Affix position={{ bottom: 20, right: 20 }}>
                {value ?
                    <Button leftSection={<IconDashboard/>} onClick={() => {navigate("/dashboard")}}>Dashboard</Button>
                    :
                    <Button leftSection={<IconUser/>} onClick={() => {setModalOpened(true)}}>Login</Button>
                }
            </Affix>
        </>
    )
}