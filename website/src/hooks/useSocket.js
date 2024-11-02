import { useCallback, useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

export const useSocket = (url, options = {}) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

    useEffect(() => {
        const socketInstance = io(url, stableOptions);
        console.log('Socket instance:', socketInstance);
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
            console.log('Socket connection closed');
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [url, stableOptions]);

    const sendMessage = useCallback((event, message, callback) => {
        if (socket) {
            socket.emit(event, message, callback);
        }
    }, [socket]);

    const subscribe = useCallback((event, callback) => {
        if (socket) {
            socket.on(event, callback);
        }

        return () => {
            if (socket) {
                socket.off(event, callback);
            }
        };
    }, [socket]);

    return { socket, isConnected, sendMessage, subscribe };
};
