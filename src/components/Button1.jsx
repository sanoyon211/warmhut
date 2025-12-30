import React from 'react'

const Button1 = ({
  btnText
}) => {
  return (
    <button className='px-3 py-2 rounded-lg bg-gray-200 text-sm text-gray-800 shadow-xl cursor-pointer transition duration-500 ease-in-out hover:bg-olive hover:text-white mb-6'>
      {btnText}
    </button>
  )
}

export default Button1