import { Carousel } from "./HomePage/HomePageComponents/Carousel";
import { ExploreTopBooks } from "./HomePage/HomePageComponents/ExploreTopBooks";
import { Heros } from "./HomePage/HomePageComponents/Heros";
import { LibraryServices } from "./HomePage/HomePageComponents/LibraryServices";

export const HomePage = () => {
    return(
        <>
            <ExploreTopBooks/>
            <Carousel/>
            <Heros/>
            <LibraryServices/>
        </>
    );
}