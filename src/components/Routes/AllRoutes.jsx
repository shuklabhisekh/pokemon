import React from 'react'
import PokemonPage from '../pages/PokemonPage'
import { Routes, Route } from 'react-router-dom'

const AllRoutes = () => {
  return (
    <>
        <Routes>

            <Route exact path='/' element={<PokemonPage/>}/>

        </Routes>
    </>
  )
}

export default AllRoutes