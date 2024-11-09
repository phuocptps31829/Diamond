<!DOCTYPE html>
<html>
<head>
    <title>User Chat</title>
    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<h1>User Chat</h1>
<form id="register-form">
    <input type="text" id="username" placeholder="Username" required>
    <input type="text" id="phone" placeholder="Phone" required>
    <button type="submit">Register</button>
</form>

<div id="messages"></div>
<form id="chat-form">
    <input type="text" id="message" placeholder="Message" required>
    <button type="submit">Send</button>
</form>

<script>
    const pusher = new Pusher('YOUR_PUSHER_KEY', {
        cluster: 'YOUR_PUSHER_CLUSTER'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function(data) {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
    });

    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const phone = document.getElementById('phone').value;

        fetch('/chat/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ username, phone })
        });
    });

    document.getElementById('chat-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const message = document.getElementById('message').value;

        fetch('/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ username: document.getElementById('phone').value, message })
        });

        document.getElementById('message').value = '';
    });
</script>
</body>
</html>
