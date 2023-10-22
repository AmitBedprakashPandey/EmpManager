import logo from './logo.svg';
import './App.css';
import Splasher from './Components/Splasher';
import Navbar from './Components/Navbar';
import PunchBox from './Components/PunchBox';
import PunchCountBox from './Components/PunchCountBox';

function App() {
  return (
    <>
    <Splasher/>
    <Navbar />
    <PunchBox/>
    <PunchCountBox/>
    </>
  );
}

export default App;
