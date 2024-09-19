import {useState} from "react";
import {Icon} from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import {Link, useNavigate} from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from "../utils/serverHelpers";
import {useCookies} from "react-cookie";
import WrongInfoModal from "../modals/WrongInfoModal.js";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const [createUnAuthModalOpen, setCreateUnAuthModalOpen] =
        useState(false);

    const login = async () => {
        const data = {email, password};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            
            navigate("/home");
        } else {
            alert("Failure");
            setCreateUnAuthModalOpen(true);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center bg-app-black">
            {createUnAuthModalOpen && (
                <WrongInfoModal
                    closeModal={() => {
                        setCreateUnAuthModalOpen(false);
                    }}
                />
            )}
            <div className="logo p-5 w-full flex justify-center">
            <Icon icon="marketeq:microphone-music-2" color="black" width="40" />
            <div className="text-4xl text-gray-400 font-teko"><Link to="/home">Swar</Link></div>
            </div>
            <div className="inputRegion w-1/3 py-20 flex items-center justify-center flex-col bg-black text-white p-8 rounded-lg">
                {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
                <div className="font-bold mb-4">
                    To continue, log in to Swar.
                </div>
                <TextInput
                    label="Email address"
                    placeholder="Email address"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />
                <div className=" w-full flex items-center justify-end my-8">
                    <button
                        className="bg-app-black font-semibold p-3 px-10 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        LOG IN
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Don't have an account?
                </div>
                <div className="border border-gray-300 text-gray-500 bg-gray-300 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link to="/signup">SIGN UP FOR SWAR</Link>
                </div>
                </div>
        </div>
    );
};

export default LoginComponent;
