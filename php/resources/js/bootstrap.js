/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;  // Gán 'io' vào window.io
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',  // Đảm bảo địa chỉ này đúng
});

// Kiểm tra kết nối
window.Echo.connector.socket.on('connect', () => {
    console.log('Connected to Echo server');

    // Sau khi kết nối, mới đăng ký kênh
    window.Echo.channel('Notifications')
        .listen('NotificationsEvent', (event) => {
            console.log('Event received:', event);  // Kiểm tra dữ liệu sự kiện nhận được
        });
});

window.Echo.connector.socket.on('disconnect', () => {
    console.log('Disconnected from Echo server');
});

console.log(window.Echo);  // Kiểm tra xem Echo đã được khởi tạo chưa
