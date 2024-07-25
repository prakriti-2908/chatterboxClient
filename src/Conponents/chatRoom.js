import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './styles/ChatRoom.css';
import { RoomContext } from '../Context';
import EmojiPicker from 'emoji-picker-react';

function ChatRoom() {
    const [msg, setMsg] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messages = useRef(null);
    const socketRef = useRef();
    const { room, name } = useContext(RoomContext);

    useMemo(() => {
        socketRef.current = io('http://localhost:8000/');
    }, []);

    useEffect(() => {
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-room', { room, name });
        });

        socketRef.current.on('leftNotification', (msg) => {
            messages.current.innerHTML += `<p style="color:red; font-weight:600; display:flex; justify-content: center;">${msg}</p>`;
        });

        socketRef.current.on('welcome', () => {
            messages.current.innerHTML += `<p style="color:blue; font-weight:600; display:flex; justify-content: center;">Welcome ${name}</p>`;
        });

        socketRef.current.on('receive-message', ({ msg, name }) => {
            messages.current.innerHTML += `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-bottom: 10px; /* Add spacing between messages */
                ">
                    <small style="
                        font-size: 10px;
                        color: black;
                        margin-bottom: 5px;
                    ">${name}</small>
                    <p class="myMsg" style="
                        border: 1px solid #DCE8FF;
                        border-radius: 10px;
                        width: fit-content;
                        padding: 5px 20px;
                        color: black;
                        background-color: #DCE8FF;
                        margin: 0; /* Remove default margin */
                        position: relative;
                        max-width: 30%;
                        min-width: 10%;
                        flex-wrap: wrap;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                        overflow-y: hidden;
                        overflow-x: hidden;
                        height: auto;
                        padding-bottom: 20px;
                    ">
                        ${msg ? msg : `<span style="color:red; font-size:small; font-weight:600;">Automated message: </span> Hi, I am ${name}`}
                        <sub style="
                            font-size: 8px;
                            color: black;
                            position: absolute;
                            bottom: 1px;
                            right: 5px;
                        ">${new Date().toLocaleTimeString()}</sub>
                    </p>
                </div>
            `;
            scrollToBottom();
        });

        return () => {
            socketRef.current.emit('disconnected', { msg: `${name} has disconnected`, room });
            socketRef.current.disconnect();
        };
    }, [name, room]);

    function sendMessage(e) {
        e.preventDefault();
        socketRef.current.emit("message", { msg, room, name });
        messages.current.innerHTML += `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin-bottom: 10px; /* Add spacing between messages */
            ">
                <small style="
                    font-size: 10px;
                    color: black;
                    margin-bottom: 5px;
                ">me</small>
                <p class="myMsg" style="
                    border: 1px solid #4399FF;
                    border-radius: 10px;
                    width: fit-content;
                    padding: 5px 20px;
                    color: white;
                    background-color: #4399FF;
                    margin: 0; /* Remove default margin */
                    position: relative;
                    max-width: 30%;
                    min-width: 10%;
                    flex-wrap: wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    overflow-y: hidden;
                    overflow-x: hidden;
                    height: auto;
                    padding-bottom: 20px;
                ">
                    ${msg}
                    <sub style="
                        font-size: 8px;
                        color: white;
                        position: absolute;
                        bottom: 1px;
                        right: 5px;
                    ">${new Date().toLocaleTimeString()}</sub>
                </p>
            </div>
        `;
        scrollToBottom();
        setMsg('');
    }

    function scrollToBottom() {
        messages.current.scrollTop = messages.current.scrollHeight;
    }

    function handleEmojiClick(emojiData, event) {
        console.log('Emoji selected:', emojiData.emoji); // Debugging log
        setMsg(prevMsg => prevMsg + emojiData.emoji);
        setShowEmojiPicker(false); // Hide the picker after an emoji is selected
    }

    return (
        <div className="chatRoom">
            <div className='chats chatRoomItems'>
                <div className="roomName">Room Name : {room}</div>
                <div className="messages" ref={messages}></div>
                <form onSubmit={sendMessage}>
                    <div className="inputChatRoom">
                        <input onChange={(e) => { setMsg(e.target.value) }} value={msg} type="text" name='message' placeholder='Type here' />
                        <button type="button" onClick={() => setShowEmojiPicker(prev => !prev)}>😊</button>
                        {showEmojiPicker && (
                            <div style={{ position: 'absolute', bottom: '50px', right: '50px' }}>
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                        <button id='send' type='submit'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;
