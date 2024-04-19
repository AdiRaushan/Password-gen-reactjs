import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLenght] = useState(8);
  const [NumAllow, setNumAllow] = useState(false);
  const [charAllow, setchar] = useState(false);
  const [password, setpassword] = useState("");
  //The useCallback Hook only runs when one of its dependencies update.

  const passwordref = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumAllow) str += "0123456789";
    if (charAllow) str += "/.,:;][@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, NumAllow, charAllow, setpassword]);

  const copyFn = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [NumAllow, charAllow, length, passwordGen]);

  console.log(length, NumAllow, charAllow);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-sky-900 text-green-200">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="Password Is In Making"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copyFn}
            class="outline-none bg-red-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={setNumAllow}
              className="cursor-pointer"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="Number-input">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={setchar}
              className="cursor-pointer"
              onChange={() => {
                setchar((prev) => !prev);
              }}
            />
            <label htmlFor="character">Special-Character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
