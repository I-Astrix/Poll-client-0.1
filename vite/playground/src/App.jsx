import './App.css';
import './index.css'
import Pages from './Pages/Pages';
import { AuthContext } from './context/AuthContext';
import { Provider } from 'react-redux';


function App() {
  return(
    <AuthContext>
    <Pages/>
    </AuthContext>
  )
}

export default App
