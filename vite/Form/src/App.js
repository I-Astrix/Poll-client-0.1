
import './App.css';
import Login from './components/Login.jsx';
import  "bootstrap/dist/css/bootstrap.css"
import Leftside from './components/Leftside';
import Rightside from './components/Rightside';
import { Col, Row } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
     <Login/>
     <Row className='loading'>
    <Col><Leftside/></Col> 
     <Col><Rightside/></Col>
     </Row>
    </div>
  );
}

export default App;
