import {useState} from "react";
import {Icon} from "@iconify/react";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import TextWithHover from "../components/shared/TextWithHover";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";
import {Link, useNavigate} from "react-router-dom";
import DropdownMenu from "../components/shared/DropdownMenu";

const UploadSong = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const navigate = useNavigate();

    const submitSong = async () => {
        const data = {name, thumbnail, track: playlistUrl};
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Success");
        navigate("/home");
    };

    return (
        <div className="h-full w-full flex">
            {/* This first div will be the left panel */}
            <div className="h-full w-1/5 bg-app-black flex flex-col justify-between pb-10">
                <div>
                    {/* This div is for logo */}
                    <div className="logoDiv p-6 flex">
                    <Icon icon="marketeq:microphone-music-2" color="orange" width="40" />
                    <div className="text-4xl text-gray-400 font-teko"><Link to="/home">Swar</Link></div>
                    </div>
                    <div className="py-5">
                    <IconText
                                iconName={"fluent:home-20-filled"}
                                displayText={"Home"}
                                targetLink={"/home"}                               
                            />
                            <IconText
                                iconName={"charm:search"}
                                displayText={"Search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"ion:library"}
                                displayText={"Library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "iconamoon:music-album"
                                }
                                displayText={"My Music"}
                                targetLink="/myMusic"
                            />
                    </div>
                    <div className="pt-5">
                    <IconText
                                iconName={"ic:baseline-add-box"}
                                displayText={"Create Playlist"}
                                targetLink={"/home"}
                            />
                            <IconText
                                iconName={"tabler:music-heart"}
                                displayText={"Liked Songs"}
                                targetLink={"/home"}
                            />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>
            {/* This second div will be the right part(main content) */}
            <div className="h-full w-4/5 bg-app-gray overflow-auto">
                <div className="navbar w-full h-1/10 bg-app-black flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-2/3 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-1/3 flex justify-around h-full items-center">
                            <TextWithHover displayText={"Upload Song"} />
                            <div className="relative bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                            <DropdownMenu />
                        </div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">
                    <div className="text-2xl font-semibold mb-5 text-white mt-8">
                        Upload Your Music
                    </div>
                    <div className="w-2/3 flex space-x-3">
                        <div className="w-1/2">
                            <TextInput
                                label="Name"
                                labelClassName={"text-white"}
                                placeholder="Name"
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-1/2">
                            <TextInput
                                label="Thumbnail"
                                labelClassName={"text-white"}
                                placeholder="Thumbnail"
                                value={thumbnail}
                                setValue={setThumbnail}
                            />
                        </div>
                    </div>
                    <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-3 w-1/3">
                                {uploadedSongFileName.substring(0, 35)}...
                            </div>
                        ) : (
                            <CloudinaryUpload
                                setUrl={setPlaylistUrl}
                                setName={setUploadedSongFileName}
                            />
                        )}
                    </div>
                    <div
                        className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
                        onClick={submitSong}
                    >
                        Submit Song
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadSong;
