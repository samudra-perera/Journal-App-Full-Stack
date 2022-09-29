import axios from 'axios'
import React, {useEffect, useState} from 'react'
axios.defaults.withCredentials = true

export const Welcome = () => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    const res = await axios.get('http://localhost:2121/user', {
      withCredentials: true
    }).catch(err => console.log(err))
    const data = await res.data
    return data
  }

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [])
  return (
    <div>
      {user && <h1>{user.userName}</h1>}
    </div>
  )
}

export default Welcome