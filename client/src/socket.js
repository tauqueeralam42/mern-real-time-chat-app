import io from 'socket.io-client';

let socket;

export const connectSocket = (userId) => {
  socket = io(import.meta.env.VITE_BACKEND_URL, {
    query: { userId },
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const getSocket = () => socket;