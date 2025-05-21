import {Stack} from "@mantine/core";
import Number from "./number.tsx";
import FoldedPerDay from "./folded_per_day.tsx";
import GivenAway from "./given_away.tsx";
import { Carousel } from "@mantine/carousel";

export default function PhoneMain() {
    return (
        <>
            <Carousel withIndicators height={"100%"} w={"100%"} emblaOptions={{loop: true}} withControls={false}>
                <Carousel.Slide>
                    <Stack h={"100%"} justify={"center"}>
                        <Number/>
                    </Stack>
                </Carousel.Slide>
                <Carousel.Slide style={{height: "100%"}}>
                    <Stack h={"100%"} justify={"center"}>
                        <GivenAway/>
                        <FoldedPerDay/>
                    </Stack>
                </Carousel.Slide>
            </Carousel>
        </>
    )
}