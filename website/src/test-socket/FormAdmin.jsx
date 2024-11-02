import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const AdminChat = () => {
    const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
    const [messages, setMessages] = useState({});
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentRoom, setCurrentRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [latestMessages, setLatestMessages] = useState({});

    console.log('currentRoom:', currentRoom);
    console.log('latestMessages:', latestMessages);
    console.log('messages:', messages);

    useEffect(() => {
        if (!socket) return;

        const handleActiveRooms = (activeRooms) => {
            setRooms(activeRooms);
        };
        sendEvent('getActiveRooms', null, handleActiveRooms);

        const unsubscribeActiveRooms = subscribe('activeRooms', handleActiveRooms);

        return () => unsubscribeActiveRooms();
    }, [socket, subscribe]);

    const handleNewMessage = useCallback((data, type) => {
        console.log('New message received:', data.message);
        setLatestMessages((prevLatestMessages) => ({
            ...prevLatestMessages,
            [data.room]: data.message,
        }));
        setMessages((prevMessages) => {
            if (prevMessages[data.room]) {
                return {
                    ...prevMessages,
                    [data.room]: [
                        ...prevMessages[data.room],
                        { type, message: data.message, name: 'Admin' }
                    ],
                };
            }
            return {
                ...prevMessages,
                [data.room]: [{ type, message: data.message, name: 'Admin' }],
            };
        });
    }, []);

    useEffect(() => {
        if (!socket) return;

        const unsubscribeUser = subscribe(
            'newMessageUser',
            (data) => handleNewMessage(data, 'user')
        );
        const unsubscribeAdmin = subscribe(
            'newMessageAdmin',
            (data) => handleNewMessage(data, 'admin')
        );

        return () => {
            unsubscribeUser();
            unsubscribeAdmin();
        };
    }, [subscribe, handleNewMessage, socket]);

    useEffect(() => {
        if (!socket) return;

        const handlePreviousMessages = (previousMessages) => {
            setMessages(previousMessages);

            const latestMessage = previousMessages[currentRoom]?.[previousMessages[currentRoom].length - 1]?.message;

            setLatestMessages((prevLatestMessages) => ({
                ...prevLatestMessages,
                [currentRoom]: latestMessage,
            }));
        };

        const unsubscribePreviousMessages = subscribe(
            'previousMessages', handlePreviousMessages
        );

        return () => unsubscribePreviousMessages();
    }, [socket, currentRoom, subscribe]);

    const joinRoom = (room) => {
        setCurrentRoom(room);
        setMessages([]);
        socket.emit('joinRoom', room);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        sendEvent(
            'newMessageAdmin',
            { message: value, room: currentRoom, name: 'Admin' },
            () => {
                setIsLoading(false);
                setValue('');
            }
        );
    };

    return (
        <div>
            <div>
                <h3>Chon Phong Chat</h3>
                <ul>
                    { rooms.filter(room => room !== socket?.id).map((room, index) => (
                        <li key={ index } onClick={ () => joinRoom(room) }>
                            { room }  - { latestMessages[room] || 'Chua co' }
                        </li>
                    )) }
                </ul>
            </div>
            <ul>
                { messages[currentRoom] ? messages[currentRoom].map((message, index) => (
                    <li
                        key={ index }
                        className={ message.type === 'user' ? 'text-red-500' : 'text-blue-500' }
                    >
                        { (message.type === 'user' ? message.name : "Admin") + ": " + message.message }
                    </li>
                )) : '' }
            </ul>
            <form onSubmit={ onSubmit }>
                <input
                    className='border border-red-400'
                    value={ value }
                    onChange={ e => setValue(e.target.value) }
                />
                <button type="submit" disabled={ isLoading }>Gui</button>
            </form>
        </div>
    );
};

export default AdminChat;
