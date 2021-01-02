# Chat-Backend

As a backend for frontend APP [Chat-Client](https://github.com/MOONYAN/chat-client) communicate in websocket.

## Feature

- echo **message** from client
- broadcast **time message** to every client per minute
- broadcast **welcome message** after client connected
- broadcast **notify message** after client disconnected
- broadcast **chat message** from client

## Message Event

- for echo
```
emit('chatToServer',<payload>)
```

- for brocast
```
emit('brocastToServer',<payload>)
```

- for receive
```
on('chatToClient',<payload>)
```

## Skill

- [nestjs-cli](https://nestjs.com/) version 7.5
- socket.io
- Task Scheduling

## Installation

- node 12.18
```
yarn
```

## Launch server
```
yarn start
```