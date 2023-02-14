import Apaexlinecolumn from './ApexLineChart';
import './App.css';
import FileUpload from './FileUpload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <header className="App-header">
        <FileUpload />
        <div style={{ marginTop: 20 }}>
          <div className='card'>
            <div className='card-header'>
              Export Chart Data
            </div>
            <div className='card-body'>
              <Apaexlinecolumn />
            </div>
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
