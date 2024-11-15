import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const userName = "ADMIN";
const phoneNumber = "0999999998";

const AdminChat = () => {
    const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
    const [messages, setMessages] = useState({});
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentRoom, setCurrentRoom] = useState('');
    const [rooms, setRooms] = useState([]);

    console.log('currentRoom:', currentRoom);
    console.log('messages:', messages);

    useEffect(() => {
        if (!socket) return;

        const handleActiveRooms = (activeRooms) => {
            console.log('Active rooms:', activeRooms);
            setRooms(activeRooms);
        };
        sendEvent('getActiveRooms', null, handleActiveRooms);

        const unsubscribeActiveRooms = subscribe('activeRooms', handleActiveRooms);

        return () => unsubscribeActiveRooms();
    }, [socket, subscribe]);

    const handleNewMessage = useCallback((data, type) => {
        console.log('New message received:', data.message);
        setMessages((prevMessages) => {
            if (prevMessages[data.room]) {
                return {
                    ...prevMessages,
                    [data.room]: [
                        ...prevMessages[data.room],
                        { type, message: data.message, name: 'Admin', phoneNumber: data.phoneNumber },
                    ],
                };
            }
            return {
                ...prevMessages,
                [data.room]: [{ type, message: data.message, name: 'Admin', phoneNumber: data.phoneNumber }],
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
            { message: value, room: currentRoom, name: 'Admin', phoneNumber },
            () => {
                setIsLoading(false);
                setValue('');
            }
        );
    };

    const roomsConverted = Array.from(Object.entries(rooms));
    console.log('roomsConverted:', roomsConverted.filter(room => room[0] !== socket?.id));

    return (
        <div>
            <div>
                <h3>Chon Phong Chat</h3>
                <ul>
                    { roomsConverted.filter(room => room[0] !== socket?.id).map((room, index) => (
                        <li key={ index } onClick={ () => joinRoom(room[0]) }>
                            { room[1][0].name + " - " + (room[1][0].phoneNumber) }  - { room[1][room[1].length - 1].message || 'Chua co' }
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
                        { (message.type === 'user' ? message.name + ' - ' + message.phoneNumber : "Admin") + ": " + message.message }
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
