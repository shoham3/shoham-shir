import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login  from './components/Login'
import Home  from './components/Home'
import ShowFile from "./components/ShowFile";
import Folder from './components/Folder'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to ='login' replace/>}/>
        <Route path='/login' element={<Login />}></Route>
        <Route path=':username' element={<Home />}></Route>
        <Route path="/:username/file/:filename" element={<ShowFile />} />
        <Route path="/:username/:foldername" element={<Folder />} />
      </Routes>

    </>
  )
}
export default App;
