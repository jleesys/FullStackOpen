const Contents = (props) => {
  const a = 100;
  const b = 69;

  let user = 'Shrek';

  return (
    <p>{user} has entered the {props.location}. You better 
    be {props.ageLimit} years old!</p>
  )

}

const App = () => (
  <div>
    <p>Hello world</p>
    <Contents location="swamp" ageLimit="18" />
  </div>
)

export default App