import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedEffect = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        'Welcome to WarmHut!',
        'Premium Winter Collections!',
        'Free Delivery on 1000TK+!',
        'Shop Smart. Stay Warm.',
      ],
      typeSpeed: 70,
      backSpeed: 35,
      loop: true,
      backDelay: 1800,
    });
    return () => typed.destroy();
  }, []);

  return (
    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white">
      <span ref={typedElement}></span>
      <span className="text-olive">_</span>
    </h2>
  );
};

export default TypedEffect;
