import React from 'react'

const Button2 = ({
  btnText
}) => {
  return (
    <button className="px-5 py-2 rounded-lg bg-olive  text-sm text-white  shadow-xl cursor-pointer transition duration-500 ease-in-out hover:bg-gray-200 hover:text-gray-800 mb-6">
      {btnText}
    </button>
  );
}

export default Button2