import React from 'react';
import './index.css'

let names = [
  'avery',
  'crystal',
  'eleanor',
  'landon',
  'eli',
]

function pickRandomName() {
  return names[Math.floor(Math.random() * names.length)]
}

function pickRandomNames(sizeOf) {
  let arr = [];
  for (let i = 0; i < sizeOf; i++) {
    let obj = {
      id: i,
      name: pickRandomName(),
      active: true,
      show: false,
    }
    console.log(`i=${i}, i+1=${i+sizeOf}`)

    let obj2 = {...obj, id: i + sizeOf}
    arr.push(obj, obj2);
  }
  arr.sort((a, b) => {
    return Math.random() > 0.5 ? 1 : -1;
  })
  return arr;
}


function Avatar({name}) {
  const src = `assets/${name.name}.png`
  const style = {
    backgroundColor: 'teal',
    backgroundImage: name.show && `url(${src})`,
  }
  return (
    <div data-name={name.name} data-id={name.id} className="avatar" style={style}/>
  )
}

function Avatars({nbrPairs}) {
  const [tries, setTries] = React.useState(0)
  const [names, setNames] = React.useState(pickRandomNames(nbrPairs))
  const [activeName, setActiveName] = React.useState(null)

  function handleClick(e) {
    console.log('click')
    if (!e.target.dataset?.id) {
      return
    }
    console.log(e.target.dataset.id)
    const name = names.find(name => name.id === +e.target.dataset.id)
    if (!name.active || name.show) {
      console.log('no longer active')
      return
    }
    if (!activeName) {
      setActiveName({...name})
      setNames(prevNames => {
        return prevNames.map(prevName => prevName === name ? {...prevName, show: true} : prevName)
      })
      return
    }
    setTries(prevTries => prevTries + 1)
    if (name.name === activeName.name) {
      setActiveName(null)
      setNames(prevNames => {
        return prevNames.map(prevName => prevName.id === name.id || prevName.id === activeName.id ? {...prevName, show: true, active: false}: prevName)
      })
    } else {
      setActiveName(null)
      setNames(prevNames => {
        return prevNames.map(prevName => prevName.id === name.id || prevName.id === activeName.id ? {...prevName, show: false, active: true}: prevName)
      })
    }
  }

  return (
    <div>
      <div>
        <p>Number of tries: {tries}</p>
      </div>
      <div className="avatars" onClick={handleClick}>
        {names.map((name, i) => (
          <Avatar name={name} key={i}/>
        ))}
      </div>
    </div>

  )
}

function Game() {
  const [nbrPairs, setNbrPairs] = React.useState(1)
  const [start, setStart] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    if (nbrPairs <= 0 || nbrPairs > 100) {
      return
    }
    if (start) {
      return
    }
    setStart(true)
  }

  function handleChange(e) {
    setNbrPairs(+e.target.value)
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tiles">Number of tile pairs</label><br/>
      <input id="tiles" value={nbrPairs} onChange={handleChange} type="text"
             placeholder="number of tile pairs..."/><br/>
      <button>submit</button>
    </form>
  )
  return (
    <div className="game">
      <h1>Match the George!</h1>
      {!start && form}
      {start && <Avatars nbrPairs={nbrPairs}/>}
    </div>
  )
}

export default function App() {
  return (
    <Game/>
  )
}