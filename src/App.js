import Home from './components/Home'
import NavBar from './components/Navbar'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
    <div className="h-full w-full overflow-x-hidden">
      <NavBar/>
      <Home/>
    </div>
    </RecoilRoot>
  );
}

export default App;
