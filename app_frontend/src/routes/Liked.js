import { useSelector } from "react-redux";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/shared/SingleSongCard";

const LikedList = () => {
    const likedList = useSelector((state) => state.user.likedList);
    return (
        <LoggedInContainer curActiveScreen="liked">
             <div className="text-white text-xl pt-8 font-semibold">
                Liked Songs
            </div>
            <div className="pt-10 space-y-3">
                        {likedList.songs.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div> 
        </LoggedInContainer>
    );
};

export default LikedList;