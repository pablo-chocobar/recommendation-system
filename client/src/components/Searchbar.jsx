import { useState , useRef , useEffect} from "react";
import Fuse from "fuse.js";
import Suggestions from "./Suggestions";

function Searchbar(props) {
    const [value, setValue] = useState("");
    const location = "127.0.0.1:5000";
    const [autocomplete , setAutocomplete] = useState([]);
    const [open, setOpen] = useState(false);

    const searchRef = useRef("");
    const inputRef = useRef("");

    useEffect(() => {
        if (autocomplete.length == 0){
            setOpen(false)
        }
        else{
            setOpen(true)
        }
    } , [autocomplete]);

    const options = {
        includeScore: false,
        minMatchCharLength: 3
    }  
    const fuse = new Fuse(props.titles , options)

    function onchange(e) {
        setValue(e.target.value);
        const x = fuse.search(e.target.value , {threshold : 0.8}).slice(0,5);
        setAutocomplete(x.map(({item}) => item));
    }   

    async function onclick(e) {
        e.preventDefault();

        let formdata = new FormData();
        formdata.append("movie", value);

        const settings = {
            method: 'POST',
            body: formdata
        };
        console.log(formdata);

        try {
            const response = await fetch(`http://${location}/api/suggest`, settings);
            const data = await response.json();
            var movies = [];
            data["movies"].forEach(function (movie) {
                movies.push({
                    "name": movie[0],
                    "img": movie[1],
                    "link": movie[2]
                })
            }
            )
            props.setmovies(movies);

        } catch (e) {
            console.log(e);
            return e;
        }
    }
    return (
        <div>
            <form className="container flex flex-row justify-between items-center border border-content bg-secondary text-content rounded-xl outline-none focus:outline-none px-2 py-2">
                <input onChange={onchange} ref = {searchRef} className="bg-transparent focus:outline-none outline-none w-full" type="text"></input>
                <button onClick={onclick} ref = {inputRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                        <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"></path><path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path><path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z" transform="rotate(-45.001 38.24 38.24)"></path><path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
                    </svg>
                </button>
            </form>
            <Suggestions open = {open} inputref = {inputRef} setvalue = {setValue} searchref = {searchRef} setOpen = {setOpen} submit = {onclick} titles = {autocomplete}></Suggestions>
        </div>
    )
}

export default Searchbar