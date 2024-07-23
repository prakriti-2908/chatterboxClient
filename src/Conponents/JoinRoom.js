
import { useContext } from 'react';
import './styles/JoinRoom.css';
import { RoomContext } from '../Context';
import { useNavigate } from 'react-router-dom';

function JoinRoom() {

    const {room, setRoom, name, setName} = useContext(RoomContext);

    const navigate = useNavigate();

    function joinRoom(e) {
        e.preventDefault();
        navigate('/chatRoom')
        console.log(name,room);
    }

    return (
        <div className='joinRoom'>
            <h1 className='homePageHeading'>A room with guaranteed privacy</h1>
            <p className='paraHomePage'>Choose some unique name for your private room and connect with friends to chat</p>
            <form className="containerJoinRoom" onSubmit={joinRoom}>
                <input  type="text" onChange={(e)=>setName(e.target.value)} value={name} name="userName" id="roomName" placeholder='Your Name' required />
                <input  type="text" onChange={(e)=>setRoom(e.target.value)} value={room} name="roomName" id="roomName" placeholder='Room Name' required />
                <button type='submit'>Join Room</button>
            </form>
        </div>
    );
}

export default JoinRoom;
