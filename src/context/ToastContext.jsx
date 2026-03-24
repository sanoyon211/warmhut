import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-semibold backdrop-blur-sm border border-white/10
            ${toast.type === 'success' ? 'bg-olive/90' : toast.type === 'error' ? 'bg-red-500/90' : 'bg-gray-800/90'}
            animate-slideDown`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
