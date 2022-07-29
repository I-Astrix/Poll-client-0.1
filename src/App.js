import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {add} from './redux/numberSlice';

function App() {
const state = useSelector(state=> state.value);
 
  return (
      <>
 
Initial{state}

      </>
  )


  }
  


export default App;
