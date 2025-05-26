import {Skeleton, Stack, Text} from "@mantine/core";
import {useEffect, useState} from "react";

export default function GivenAway() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch("api/disposed_of")
            .then((response) => response.json())
            .then((data) => {console.log(data); setData(data.count);})
    }, [])

    return (
        <Stack>
            <Skeleton visible={data == null}>
                <Text
                    ta={"center"}
                    size={"5rem"}
                    variant={"gradient"}
                    gradient={{from: 'blue', to: 'cyan', deg: 45}}
                >
                    {data && parseInt(data).toLocaleString()}
                </Text>
            </Skeleton>
            <Text size={"lg"} fs={"italic"} ta={"center"}>Given Away</Text>
        </Stack>
    )
}