import { useState, useRef, useEffect } from "react";

import "./index.css";

function App() {
  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("Itemlocal")) || []
  );

  const inputref = useRef();

  const additems = async () => {
    const text = inputref.current.value;
    const itemlist = { complited: false, text };
    if (inputref.current.value === "") {
      alert("Please enter an Item!");
    } else {
      setItem([...item, itemlist]);
      await localStorage.setItem("Itemlocal", JSON.stringify(item));
    }

    inputref.current.value = "";
    inputref.current.focus();
  };
  console.log(item);
  const handupdate = (index) => {
    const newitem = [...item];
    newitem[index].complited = !newitem[index].complited;
    setItem(newitem);
    localStorage.setItem("Itemlocal", JSON.stringify(newitem));
  };
  const removeItems = (index) => {
    const newitem = [...item];
    newitem.splice(index, 1);
    setItem(newitem);
    localStorage.setItem("Itemlocal", JSON.stringify(newitem));
  };

  return (
    <>
      <div className="w-full  pb-14 bg-bga bg-cover   min-h-[100vh] ">
        <div className="shadow-md shadow-black/40 text-center w-[400px] mx-auto bg-gradient-to-tl from-purple-600 via-purple-400 to-sky-500 min-h-[450px] rounded-xl translate-y-10   ">
          <h1 className="text-4xl text-black font-bold mb-7 uppercase py-4">
            Todo list
          </h1>
          <input
            type="text"
            name=""
            id=""
            ref={inputref}
            required
            placeholder="add todo..."
            className="  p-2 border-2 border-gray-400 rounded-md mr-4 "
          />
          <button
            type="submit"
            className="p-2 bg-white  font-bold uppercase rounded-md hover:bg-sky-600"
            onClick={() => {
              additems();
              // saveitem(item);
            }}
          >
            Add tache
          </button>

          <ul className="mt-5">
            {item.map(({ text, complited }, index) => {
              return (
                <>
                  <li
                    className={` text-start pl-5 py-4 bg-purple-400/40 text-white font-mono font-bold text-xl  mb-3 cursor-pointer flex justify-between 
                     
                    `}
                    key={index}
                  >
                    <span
                      className={` ${
                        complited
                          ? " relative after:absolute after:left-0 after:h-0.5 after:w-full after:bg-red-600 after:top-3.5 "
                          : " "
                      }`}
                      onClick={() => {
                        handupdate(index);
                      }}
                    >
                      {text}
                    </span>

                    <span onClick={() => removeItems(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="delete"
                        x="0"
                        y="0"
                        width="30px"
                        version="1.1"
                        viewBox="0 0 52 52"
                      >
                        <path d="m33.916 18.66-1.099 22.083a1 1 0 0 1-.998.95h-.05a1 1 0 0 1-.95-1.05l1.094-21.983h-4.916v22.033a1 1 0 1 1-2 0V18.66H20.08l1.094 21.983a1 1 0 0 1-.95 1.05h-.05a1 1 0 0 1-.998-.95L18.078 18.66H9.855c-.087 0-.173-.01-.26-.013l2.56 27.403a4.333 4.333 0 0 0 4.33 3.95h19.02c2.26 0 4.12-1.7 4.33-3.95l2.56-27.403c-.084.004-.166.013-.25.013h-8.23z"></path>
                        <path
                          fill="#3c93c9"
                          d="M42.145 8.85h-7.52V6.63c0-2.56-2.07-4.63-4.63-4.63h-8c-2.55 0-4.63 2.07-4.63 4.63v2.22h-7.51c-1.93 0-3.49 1.56-3.49 3.49v.83c0 1.92 1.56 3.49 3.49 3.49h32.29a3.5 3.5 0 0 0 3.49-3.49v-.83c0-1.93-1.57-3.49-3.49-3.49zm-9.52 0h-13.26V6.63c0-1.45 1.18-2.63 2.63-2.63h8c1.45 0 2.63 1.18 2.63 2.63v2.22z"
                        ></path>
                      </svg>
                    </span>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
