import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

const UserChat = () => {
    const { sendMessage, subscribe, socket } = useSocket('http://localhost:3500');
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message, type) => {
            console.log('New message received:', message);
            setMessages((prevMessages) => [...prevMessages, { type, message }]);
        };

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
    }, [subscribe, socket]);

    const onSubmit = (event) => {
        event.preventDefault();
        // setIsLoading(true);

        if (socket) {
            sendMessage('newMessageUser', value, socket.id, () => {
                // setIsLoading(false);
                setValue('');
            });
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

export default UserChat;
