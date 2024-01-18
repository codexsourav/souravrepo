import React from "react"

function Home() {
  return (
    <div className="flex w-screen flex-col gap-5 h-screen justify-center items-center text-center">
      <div className="">
        <img src="https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png" alt="react js" className="w-20 " />
      </div>
      <h1 className="font-bold text-3xl" >CODEX REPO</h1>
      <p className=" text-3xl">repo for ready to go</p>
    </div>
  )
}
export default React.memo(Home)