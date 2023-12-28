import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Hello = (props) => {
  console.log('logging');
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}.</p>
    </div>
  )
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Hello name={'joe'} />
      <Hello name='Marly' />
      <Hello name="Charles" />
      <p>Helo worle..</p>
    </div>
  )
}

export default App
