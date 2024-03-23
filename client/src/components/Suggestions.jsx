import {React , useRef , useState , useEffect} from 'react'

function Suggestions(props) {

    const titles = props.titles;
    const [clicked , setClicked] = useState(false);
    function onclick(e){
        console.log(e.target.textContent);
        props.searchref.current.value = e.target.textContent;
        props.setvalue(e.target.textContent);
        props.setOpen(false);
        setClicked(true);
    }

    useEffect(() => {
        if (clicked) {
            props.inputref.current.click();
            setClicked(false);
        }
    } , [clicked])

    let clickRef = useRef("");
  
    useEffect(() => {
      let handler = (e)=>{
        if(!clickRef.current.contains(e.target)){
          props.setOpen(false);
        }      
      };
      document.addEventListener("mousedown", handler);

      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });

    if (props.open) {
        return (
            <div ref = {clickRef} className='border overflow-hidden rounded-t-md rounded-b-xl container absolute top-30'>
                  <ul className='divide-y divide-content'>
                  {
                      titles.map((title) => {
                          return (
                          <li className='block container px-4 py-2 bg-secondary/50 text-content hover:text-primary hover:bg-content'>
                              <button className='w-full text-left' onClick={onclick}>
                              {title}
                              </button>
                          </li>
                          )
                      })
                  }
                  </ul>
          
              </div>
        )
    }

    else {
        return (
            <div></div>
        )
    }
}

export default Suggestions