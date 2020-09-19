import io from 'socket.io-client';

const SOCKET_URI = process.env.REACT_APP_SERVER_URI;
const ioSocket = io.connect(`${SOCKET_URI}`);

export default ioSocket;
