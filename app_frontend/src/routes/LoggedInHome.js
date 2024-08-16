import {useState} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import LoggedInContainer from "../containers/LoggedInContainer";

const Trending =[
    {
        imgUrl:"https://th.bing.com/th/id/OIP.TeM4rrSSLtcKovfNTrtJgwAAAA?rs=1&pid=ImgDetMain",
        title:"Ek Tha Raja",
        description:"Badshah",
    },
    {
        imgUrl:"https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1e/21/f2/1e21f2d7-9b9a-0c78-c934-9008ec6173c4/8903431981844_cover.jpg/1200x1200bf-60.jpg", 
        title:"Teri Baaton Mein Aisa Uljha Jiya",
        description:"Tanishk Bagchi, Mitraz",
    },
    {
        imgUrl:"https://th.bing.com/th/id/OIP.nL8lYJ9Ij00fTZVTDzqJaAAAAA?rs=1&pid=ImgDetMain",
        title:"Aavesham",
        description:"Sushin Shyam, Nazriya Nazim, Sreenath Bhasi",
    },
    {
        imgUrl:"https://th.bing.com/th/id/OIP.1bZaR7PUmXK0twxwqLqrfgAAAA?w=300&h=288&rs=1&pid=ImgDetMain",
        title:"Bad Newz",
        description:"Karan Aujla, Vishal Mishra",
    },
    {
        imgUrl:"https://th.bing.com/th/id/OIP.wP3YOlck2x6HoOwHBPAANwHaHa?rs=1&pid=ImgDetMain",
        title:"Mr. And Mrs. Mahi",
        description:"Tanishk Bagchi, Vishal Mishra, Jaani",

    }];

const DesiHipHop =[
    {
        imgUrl:"https://preview.redd.it/seedhe-maut-lunch-break-tracklist-artwork-v0-6vkxmtww9wfb1.jpg?width=1440&format=pjpg&auto=webp&s=7d6059005dcfa6719002fa09c4be19c5426a579f",
        title:"Lunch Break",
        description:"Seedhe Maut",
    },
    {
        imgUrl:"https://images.ams-prd.blv.cloud/eyJidWNrZXQiOiJpbWFnZXMtcHJkLTFvNHV6OXpieHd6cDF1Ym0iLCJrZXkiOiJkMjhkYTYxZi0xNzAxLTQ0MTUtYTA0Yi0zNDE2MDY4ZDQzZWYiLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6ImpwZWciLCJyZXNpemUiOnsid2lkdGgiOjEyMDB9fX0=", 
        title:"Still Here",
        description:"Krsna",
           
    },
    {
        imgUrl:"https://t2.genius.com/unsafe/600x600/https://images.genius.com/ee4b2dfa4b5fbebb94833fce25aefdc9.1000x1000x1.jpg",
        title:"throwaways one",
        description:"Jaiyash, Sarcastically Kumar",
    },
    {
        imgUrl:"https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cf/9f/07/cf9f07b0-9bab-97f4-af62-9d05c622bedd/cover.jpg/1200x1200bf-60.jpg",
        title:"Hard Drive Vol. 1",
        description:"Raftaar",
    },
    {
        imgUrl:"https://c.saavncdn.com/304/Desi-Kalakaar-Hindi-2014-500x500.jpg",
        title:"Desi Kalakaar",
        description:"Yo Yo Honey Singh, Lil Golu",
    
    }];

const Bollywood =[
    {
        imgUrl:"https://th.bing.com/th/id/OIP.pc6XLW4d3tJOI7KDRDzzGwHaHa?rs=1&pid=ImgDetMain",
        title:"Rockstar",
        description:"A. R. Rahman, Irshad Kamil",
    },
    {
        imgUrl:"https://upload.wikimedia.org/wikipedia/en/4/4f/Aashiqui_2.jpeg", 
        title:"Aashiqui 2",
        description:"Arijit Singh, KK, Mithoon",          
    },
    {
        imgUrl:"https://media.senscritique.com/media/000018293282/source_big/Ae_Dil_Hai_Mushkil_Deluxe_Edition_Bande_Originale.jpg",
        title:"Ae Dil Hai Mushkil",
        description:"Pritam",
    },
    {
        imgUrl:"https://images-na.ssl-images-amazon.com/images/I/91UDTwSYsuL._AC_SL1400_.jpg",
        title:"Raanjhanaa",
        description:"A. R. Rahman",
    },
    {
        imgUrl:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/fe/21/e2fe21b6-50e6-7b4b-285a-d40394baba4e/8902894628990_cover.jpg/1200x1200bf-60.jpg",
        title:"Delhi-6",
        description:"A. R. Rahman, Rajat Dholakia",
    }];

const Home = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
           <PlaylistView titleText="Trending" cardsData={Trending}/>
            <PlaylistView titleText="Desi HipHop" cardsData={DesiHipHop}/>
            <PlaylistView titleText="Bollywood" cardsData={Bollywood}/>
        </LoggedInContainer>
    );
};

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    // cardsData will be an array
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

const Card = ({title, description, imgUrl}) => {
    return (
        <div className="bg-app-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Home;