import Router from "next/router"

const Home  = () => {

  const hostRooterHandle = ()=> {
    Router.push("/launchRoom")
  }
  
  const loginRooterHandle = () => {
    Router.push("/login")
  }

  return (
    <>
    <p>Syncationとはsynchronismとmotivationをかけ合わせた言葉で</p>
    <h1 >TOP ページです</h1>
    <button onClick={hostRooterHandle}>ルーム作成</button>
    <button onClick={loginRooterHandle}>ルーム参加</button> 
    </>
  )
}

export default Home
