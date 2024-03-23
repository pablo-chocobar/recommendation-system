import { React, useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

function Navbar() {

//   const location = useLocation();

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    var darkModeButton = document.getElementsByClassName('toggle-dark-state')[0];

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      updatePreviewThemeToggleButton(darkModeButton, 'dark');

    }
    else {
      setTheme('light');
      updatePreviewThemeToggleButton(darkModeButton, 'light');
    }
  }, [])


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  var updatePreviewThemeToggleButton = function updatePreviewThemeToggleButton(darkModeButtonEl, theme) {
    var moonIconEl = darkModeButtonEl.querySelector('[data-toggle-icon="moon"]');
    var sunIconEl = darkModeButtonEl.querySelector('[data-toggle-icon="sun"]');
    var buttonTextEl = null;

    if (theme === 'dark') {
      darkModeButtonEl.setAttribute('data-toggle-dark', 'dark');
      moonIconEl.classList.add('hidden');
      sunIconEl.classList.remove('hidden');
    } else {
      darkModeButtonEl.setAttribute('data-toggle-dark', 'light');
      moonIconEl.classList.remove('hidden');
      sunIconEl.classList.add('hidden');
    }
  };

  const handleThemeChange = () => {

    var darkModeButton = document.getElementsByClassName('toggle-dark-state')[0];
    if (theme === 'light') {
      updatePreviewThemeToggleButton(darkModeButton, 'dark');
    }
    if (theme === 'dark') {
      updatePreviewThemeToggleButton(darkModeButton, 'light');
    }

    setTheme(theme === "dark" ? "light" : "dark");
  }


//   if (location.pathname == "/headon"){
//     return (
//       <nav className='bg-transparent flex flex-row items-center pt-2 pl-2'>
  
//         <Link to="/" className='font-bold'>Home</Link>
  
//         <div className='mx-8'>
//           <button type="button" onClick={handleThemeChange} data-toggle-dark="dark" className="flex items-center w-9 h-9 justify-center font-medium text-content border border-content bg-primary rounded-lg toggle-dark-state" >
//             <svg data-toggle-icon="moon" className="w-3.5 h-3.5 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
//               <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
//             </svg>
//             <svg data-toggle-icon="sun" className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
//             </svg>
//           </button>
  
//         </div>
  
//       </nav>
//     )
//   }
  return (
    <nav className='flex flex-row items-center pb-2 pl-2'>

      {/* <Link to="/" className='font-bold'>Home</Link> */}

      <div className='mx-8'>
        <button type="button" onClick={handleThemeChange} data-toggle-dark="dark" className="flex items-center w-9 h-9 justify-center font-medium text-content border border-content bg-primary rounded-lg toggle-dark-state" >
          <svg data-toggle-icon="moon" className="w-3.5 h-3.5 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
          </svg>
          <svg data-toggle-icon="sun" className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
          </svg>
        </button>

      </div>

    </nav>
  )
}

export default Navbar