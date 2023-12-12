import { Routes, Route } from 'react-router-dom';
import Layouts from './components/Layouts';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import SignUp from './features/auth/SignUp';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />} >
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        
        <Route path="dash" element={<DashLayout />} >
          <Route index element={<Welcome />} />

          <Route path="notes" > 
            <Route index element={<NotesList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

        </Route> {/* end of dash layout */}
      </Route> {/* end of layouts */}
    </Routes> 
  );
}

export default App;
