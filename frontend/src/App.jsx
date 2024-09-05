import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'
import { Provider } from 'react-redux'
import store from './redux/store/store'


function App() {
  

  return (
   <div>
    <Provider store={store}>
    <RouterProvider router={Router} />
    </Provider>
    
   </div>
  )
}

export default App
