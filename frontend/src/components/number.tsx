import {Skeleton, Stack, Text} from "@mantine/core";
import {useEffect, useState} from "react";

export default function Number() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8000/count")
            .then((response) => response.json())
            .then((data) => {console.log(data); setData(data.count);})
    }, [])

    console.log("X" + data)

    return (
        <Stack>
            <Skeleton visible={data == null}>
                <Text
                    ta={"center"}
                    size={"9rem"}
                    variant={"gradient"}
                    gradient={{from: 'blue', to: 'cyan', deg: 45}}
                >
                    {data && parseInt(data).toLocaleString()}
                </Text>
            </Skeleton>
            <Text size={"lg"} fs={"italic"} ta={"center"}>Cranes Folded</Text>
        </Stack>
    )
}