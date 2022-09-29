import axios from 'axios'
import React, {useEffect, useState} from 'react'
axios.defaults.withCredentials = true
// let firstRender = true;


export const Welcome = () => {
  const [user, setUser] = useState();

  // const refreshToken = async () => {
  //   const res = await axios.get('http://localhost:2121/refresh', {
  //     withCredentials: true
  //   }).catch(err => console.log(err))
  //   const data = await res.data
  //   return data
  // };

  const sendRequest = async () => {
    const res = await axios.get('http://localhost:2121/user', {
      withCredentials: true
    }).catch(err => console.log(err))
    const data = await res.data
    return data
  }

  useEffect(() => {
    // if(firstRender) {
    //   firstRender = false
      sendRequest().then((data) => setUser(data.user))
    // }
    // let interval = setInterval(() => {
    //   refreshToken().then(data => setUser(data))
    // }, 1000 * 28)
    
    // return data

  }, [])
  return (
    <div>
      {user && <h1>{user.userName}</h1>}
    </div>
  )
}

export default Welcome