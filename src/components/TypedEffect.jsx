import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedEffect = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        'Welcome to WarmHut!',
        'Best Winter Clothes Collection!',
        'Premium Quality Guaranteed!',
      ],
      typeSpeed: 80,
      backSpeed: 40,
      loop: true,
    });

    // cleanup (component unmount)
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <h2 className="text-xl md:text-4xl font-bold text-olive">
      <span ref={typedElement}></span>
    </h2>
  );
};

export default TypedEffect;
