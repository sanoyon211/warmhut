import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router/router';

// ⭐ AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

// ⭐ AOS Initialize
AOS.init({
  duration: 800, // animation duration
  easing: 'ease-in-out', // smooth animation
  once: false, // scroll এ বারবার animation চাইলে false রাখো
});

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
);
