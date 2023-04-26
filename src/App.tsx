import React from 'react'
import liff from '@line/liff'
import { FilterContext, FilterTypes } from './Context'
import Tabs from './Tabs'

const isMINI = new URLSearchParams(location.search).has('mini')
const filter = isMINI ? FilterTypes.MINI : FilterTypes.LIFF

function App() {
  let isLoggedIn = false
  try {
    isLoggedIn = liff.isLoggedIn()
  } catch (e) {
    console.log(e)
  }
  return (
    <FilterContext.Provider value={filter}>
      <div className="bg-slate-100 h-screen">
        <div className="w-full p-4 justify-center items-center">
          <div>這是一串測試文字</div>
        </div>
        <Tabs />
      </div>
    </FilterContext.Provider>
  )
}

export default App
