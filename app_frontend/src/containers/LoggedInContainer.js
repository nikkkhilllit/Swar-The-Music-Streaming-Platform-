import {useContext, useState, useLayoutEffect, useRef} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";
import {Link, Navigate} from "react-router-dom";
import DropdownMenu from "../components/shared/DropdownMenu";
import TranslateDiv from "../components/shared/TranslateButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {setLikedList} from "../components/shared/setLikedList"; 


const LoggedInContainer = ({children, curActiveScreen,songId,artist}) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
        useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    
    const refreshPage = () => {
        window.location.reload(); 
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const likedList = user?.likedList || [];

    const isLiked = likedList?.find((item) => item?._id === songId);

    const patchWishList = async () => {
    if (user?._id !== artist._id) {
    const response = await fetch(
      `http://localhost:8080/users/${user?._id}/${songId}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setLikedList(data.likedList));
  } else { return }
  };

    return (
        <div className="h-full w-full bg-app-black">
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                {/* This first div will be the left panel */}
                <div className="h-full w-1/5 bg-app-black flex flex-col justify-between pb-10">
                    <div>
                        {/* This div is for logo */}
                        <div className="logoDiv p-6 flex" onClick={refreshPage}>
                        <Icon icon="marketeq:microphone-music-2" color="orange" width="40" />
                        <div className="text-4xl text-gray-400 font-teko"><Link to="/home">Swar</Link></div>
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"fluent:home-20-filled"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"charm:search"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"ion:library"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "iconamoon:music-album"
                                }
                                displayText={"My Music"}
                                targetLink={"/myMusic"}
                                active={curActiveScreen === "myMusic"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"ic:baseline-add-box"}
                                displayText={"Create Playlist"}
                                onClick={() => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />
                            <IconText
                                iconName={"tabler:music-heart"}
                                displayText={"Liked Songs"}
                                targetLink={"/liked"}
                                active={curActiveScreen === "liked"}
                            />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            {/* <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div> */}
                            <TranslateDiv />
                        </div>
                    </div>
                </div>
                {/* This second div will be the right part(main content) */}
                <div className="h-full w-4/5 bg-app-gray overflow-auto">
                    <div className="navbar w-full h-1/10 bg-app-black  flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"About"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Description"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                            <IconText
                                displayText={"Upload Song"}
                                targetLink="/uploadsong"
                            />
                               <div className="relative bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                            <DropdownMenu />
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {/* This div is the current playing song */}
            {currentSong && (
                <div className="w-full h-1/10 bg-app-black bg-opacity-30 text-white flex items-center px-4">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSong.thumbnail}
                            alt="currentSongThumbail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.name}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.artist.firstName +
                                    " " +
                                    currentSong.artist.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                        {/* <div>Progress Bar Here</div> */}
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                patchWishList();
                              }}
                              disabled={!user}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;
