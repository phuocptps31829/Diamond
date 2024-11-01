import { useEffect, useState } from 'react';
import { socket } from '../socket';

const Form = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    console.log(isConnected, 'socket connected (initial)');

    const connect = () => {
        console.log('Connecting...');
        socket.connect();
    };

    const disconnect = () => {
        console.log('Disconnecting...');
        socket.disconnect();
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(3000).emit('newMessageClient', value, (err) => {
            if (err) {
                console.error('Timeout or error:', err);
            } else {
                console.log('Success');
            }
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const onConnect = () => {
            console.log('Connected to socket');
            setIsConnected(true);
        };

        const onDisconnect = () => {
            console.log('Disconnected from socket');
            setIsConnected(false);
        };

        const onFooEvent = (value) => {
            console.log('Received foo event:', value);
            setFooEvents(previous => [...previous, value]);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    console.log(isConnected, 'socket connected (after effect)');

    return (
        <div>
            <ul>
                { fooEvents.map((event, index) => (
                    <li key={ index }>{ event }</li>
                )) }
            </ul>
            <form onSubmit={ onSubmit }>
                <input
                    className='border border-red-400'
                    value={ value }
                    onChange={ e => setValue(e.target.value) }
                />
                <button type="submit" disabled={ isLoading }>Submit</button>
            </form>
            <>
                <button onClick={ connect } disabled={ isConnected }>Connect</button>
                <button onClick={ disconnect } disabled={ !isConnected }>Disconnect</button>
            </>
        </div>
    );
};

export default Form;
