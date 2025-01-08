import { useState } from 'react'
import './App.css'
import Posts from './Component/Posts'
import AddPostForm from './Component/AddPostForm'

function App() {

  const [showPost, setShowPost] = useState(true)

  return (
    
    <div>
        <h1 style={{marginBottom: "30px", fontFamily: 'sans-serif'}}>RTK Query</h1>
        <button onClick={() => setShowPost((prevState) => !prevState)}>{showPost ? 'Hide' : 'Show'} Posts</button>  

      {/* Hide button e click korle hide hoia jaitece. Then abr jkn show button e click kore then abr post gula nia astece. but kono request patacce na. ei advance feature ta hole RTK caching. But we have to control the caching. Because there is any update happened, then the user won't see the update. */}
      {showPost && <Posts/>} 

      <AddPostForm/>

    </div>
  )
}

export default App
