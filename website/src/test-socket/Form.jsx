import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const userName = "Chinh";

const UserChat = () => {
    const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message, type, name) => {
            console.log('New message received:', message);
            setMessages((prevMessages) => [...prevMessages, {
                type,
                name,
                message
            }]);
        };

        const unsubscribeUser = subscribe(
            'newMessageUser',
            (data) => handleNewMessage(data.message, 'user', data.name)
        );
        const unsubscribeAdmin = subscribe(
            'newMessageAdmin',
            (data) => handleNewMessage(data.message, 'admin', data.name)
        );

        return () => {
            unsubscribeUser();
            unsubscribeAdmin();
        };
    }, [subscribe, socket]);

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (socket) {
            sendEvent(
                'newMessageUser',
                { message: value, room: socket.id, name: userName },
                () => {
                    setIsLoading(false);
                    setValue('');
                }
            );
        }
    };

    return (
        <div>
            <ul>
                { messages.map((message, index) => (
                    <li
                        key={ index }
                        className={ message.type === 'user' ? 'text-red-500' : 'text-blue-500' }
                    >
                        { (message.type === 'user' ? message.name : "Admin") + ": " + message.message }
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

export default UserChat;
