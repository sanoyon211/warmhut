import { io } from 'socket.io-client';

// Use the environment variable if available, otherwise fallback to local server
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  withCredentials: true,
});

// Optionally log connection status in development
if (import.meta.env.DEV) {
  socket.on('connect', () => console.log('Connected to socket server:', socket.id));
  socket.on('disconnect', () => console.log('Disconnected from socket server'));
}
