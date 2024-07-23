import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinRoom from './Conponents/JoinRoom';
import Navbar from './Conponents/Navbar';
import ChatRoom from './Conponents/chatRoom';
import { RoomProvider } from './Context';
import AboutUs from './Conponents/AboutUs';
import PrivacyPolicy from './Conponents/PrivacyPlicy';

function App() {

    return (
        <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <RoomProvider>
                        <Routes>
                            <Route path='/' element={<JoinRoom />} />
                            <Route path='chatRoom' element={<ChatRoom />} />
                            <Route path='about' element={<AboutUs/>} />
                            <Route path='privacy-policy' element={<PrivacyPolicy/>} />
                        </Routes>
                    </RoomProvider>
                </BrowserRouter>
        </div>
    );
}

export default App;


