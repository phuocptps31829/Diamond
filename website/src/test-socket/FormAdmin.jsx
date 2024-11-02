import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';

const AdminChat = () => {
    const { sendMessage, subscribe, socket } = useSocket('http://localhost:3500');
    const [messages, setMessages] = useState([]);
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

        socket.emit('getActiveRooms');

        const handleActiveRooms = (activeRooms) => {
            setRooms(activeRooms);
        };

        socket.on('activeRooms', handleActiveRooms);

        return () => {
            socket.off('activeRooms', handleActiveRooms);
        };
    }, [socket]);

    const handleNewMessage = useCallback((message, type, room) => {
        console.log('New message received:', message);
        setMessages((prevMessages) => [...prevMessages, { type, message }]);
        setLatestMessages((prevLatestMessages) => ({
            ...prevLatestMessages,
            [room]: message,
        }));
    }, []);

    useEffect(() => {
        if (!socket) return;

        const unsubscribeUser = subscribe(
            'newMessageUser',
            (data) => handleNewMessage(data.message, 'user', data.room)
        );
        const unsubscribeAdmin = subscribe(
            'newMessageAdmin',
            (data) => handleNewMessage(data.message, 'admin', data.room)
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
            if (previousMessages.length > 0) {
                const latestMessage = previousMessages[previousMessages.length - 1].message;
                setLatestMessages((prevLatestMessages) => ({
                    ...prevLatestMessages,
                    [currentRoom]: latestMessage,
                }));
            }
        };

        socket.on('previousMessages', handlePreviousMessages);

        return () => {
            socket.off('previousMessages', handlePreviousMessages);
        };
    }, [socket, currentRoom]);

    const joinRoom = (room) => {
        setCurrentRoom(room);
        setMessages([]);
        socket.emit('joinRoom', room);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        sendMessage('newMessageAdmin', value, currentRoom, () => {
            console.log('in admin callback');
            setValue('');
        });
    };

    return (
        <div>
            <div>
                <h3>Chon Phong Chat</h3>
                <ul>
                    { rooms.filter(room => room !== socket?.id).map((room, index) => (
                        <li key={ index } onClick={ () => joinRoom(room) }>
                            { room } - { latestMessages[room] || 'No messages yet' }
                        </li>
                    )) }
                </ul>
            </div>
            <ul>
                { messages.map((message, index) => (
                    <li
                        key={ index }
                        className={ message.type === 'user' ? 'text-red-500' : 'text-blue-500' }
                    >
                        { message.message }
                    </li>
                )) }
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
