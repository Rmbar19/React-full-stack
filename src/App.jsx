
import './App.css';
import { Fetch } from './components/Fetch'
import { Build } from './components/Build'
import { useState, useEffect } from 'react';


function App() {
  let [buildOrder, setBuildOrder] = useState([])
  let [currentItem, setCurrentItem] = useState([])
  useEffect (()=> {
    updater()
  },[])
  let updater = () => {
    fetch('http://localhost:4001/home')
      .then((res) => {
        return res.json()
      })
      .then(build => {
        console.log(build)
        setBuildOrder(build)
      })

  }

  function removal(e) {
    console.log(e)
    fetch(`http://localhost:4001/remove/${e}`, {
      method: 'DELETE'
    }
    )
      .then((res) => console.log(res))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Age of Empires II Build Order Tool</h3>


      </header>
      <div className="main">
        <div className="body">
          <Fetch updates={updater} />
        </div>
        <div className="plan">
          <ol>
            {buildOrder.map((data) => {
              return <li className="everything" onClick={(e) => {
                window.confirm(`Delete ${data.name}?
          `) ? (removal(e.target.textContent)) : console.log("Not deleted")

              }}>{data.name}</li>
            })
            }
          </ol>
        </div>
      </div>
    </div>
  );
}
export default App;
