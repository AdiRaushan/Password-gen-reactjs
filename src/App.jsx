import React, { useCallback, useState } from "react";

const App = () => {
  const [length, setLenght] = useState(8);
  const [NumAllow, setNumAllow] = useState(false);
  const [charAllow, setchar] = useState(false);
  const [password, setpassword] = useState("");
  //The useCallback Hook only runs when one of its dependencies update.

  const passwordGen = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumAllow) str += "0123456789";
    if (charAllow) str += "/.,:;][@#$%^&*";

    for (i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, NumAllow, charAllow, setpassword]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password Is In Making"
            readOnly
          />
          <button class="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
