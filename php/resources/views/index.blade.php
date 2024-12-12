
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel Echo Listener</title>
    {{--    <script src="https://cdn.jsdelivr.net/npm/laravel-echo/dist/echo.js"></script>--}}
    {{--    @vite(['resources/js/app.js'])--}}
    <script src="https://cdn.socket.io/4.5.1/socket.io.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/laravel-echo/dist/echo.iife.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>
<h1>Laravel Echo Listening</h1>
<script>
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: 'http://localhost:6001',
        authEndpoint: '/broadcasting/auth',  // Xác nhận rằng authEndpoint là đúng
        csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Nếu bạn có sử dụng CSRF Token
    });

    console.log('Echo initialized:', window.Echo);
    // Lắng nghe sự kiện
    Echo.channel('laravel_database_Notifications')
        .listen('NotificationsEvent', (e) => {
            console.log('Event Received:', e);
        });
    Echo.connector.socket.on('event', function (event) {
        console.log('Global Event Received:', event);
    });
</script>
</body>
</html>
