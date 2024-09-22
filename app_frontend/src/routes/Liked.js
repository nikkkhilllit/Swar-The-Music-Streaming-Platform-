import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import {Icon} from "@iconify/react";

const SinglePlaylistView = () => {
    const [playlistDetails, setPlaylistDetails] = useState({});
    const {playlistId} = useParams();
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist/" + playlistId
            );
            setPlaylistDetails(response);
            console.log(response);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen={"liked"}>
            {songData.length > 0 ? (
                <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        Liked Songs
                    </div>
                    <div className="pt-10 space-y-3">
                        {playlistDetails.songs.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
             ) : (
                <div className="text-gray-400 pt-10 px-5 flex space-x-2 items-center text-lg">
                    <Icon icon="icomoon-free:shocked2" className="text-lg"/>
                    <div>Wow So Empty.</div>
                </div>
            )}
        </LoggedInContainer>
    );
};

export default SinglePlaylistView;
