import {Skeleton, Stack, Text} from "@mantine/core";
import { DateTime } from "luxon";
import {useEffect, useState} from "react";

export default function FoldedPerDay() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8000/disposed_of")
            .then((response) => response.json())
            .then((data) => {console.log(data); setData(data.count);})
    }, [])

    const startDate = DateTime.fromISO("2020-01-01");
    const daysElapsed = DateTime.now().diff(startDate, "days").toObject()["days"];

    return (
        <Stack>
            <Skeleton visible={data == null}>
                <Text
                    ta={"center"}
                    size={"5rem"}
                    variant={"gradient"}
                    gradient={{from: 'blue', to: 'cyan', deg: 45}}
                >
                    {data && (parseInt(data) / daysElapsed).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </Text>
            </Skeleton>
            <Text size={"lg"} fs={"italic"} ta={"center"}> Folded Per Day</Text>
        </Stack>
    )
}