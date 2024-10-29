import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const onCopyPassword = () => {
    window.navigator.clipboard.writeText(password);

    passwordRef.current?.select();
    console.log("copied");
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />

        <button
          className="outline-none bg-blue-700 text-white px-3"
          onClick={onCopyPassword}
        >
          Copy
        </button>
      </div>

      <div className="flex items-center gap-xp-1">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="curson-pointer"
          name=""
          id=""
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <label htmlFor="length">Length: {length}</label>
      </div>

      <div className="flex items-center gap-xp-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          className="cursor-pointer"
          onChange={() => setNumberAllowed((prev) => !prev)}
          id="num"
        />
        <label htmlFor="num" className="cursor-pointer">
          Number
        </label>
      </div>

      <div className="flex items-center gap-xp-1">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          className="cursor-pointer"
          id="charInput"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="charInput" className="cursor-pointer">
          Character
        </label>
      </div>
    </div>
  );
};

export default PasswordGenerator;
