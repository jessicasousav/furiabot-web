import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';

import './styles/mediaQueries.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesApp/>
      </BrowserRouter>
    </div>
  );
}

export default App;
