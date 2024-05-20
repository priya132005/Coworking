import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Layouts from './Layouts.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './Contact/Contact.jsx'
import User from './components/User/User.jsx'
const router =createBrowserRouter([

  {
    path:'/',
    element:<Layouts/>,
    children:[
      {
        path:"",
        element:<Home/>

      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"Contact",
        element:<Contact/>
      },

        {  path:"user:userid",
          element:<User/>
        },
    ]
  }
]) 
// const router =createBrowserRouter(
//   createRoutersFromElements(
//     <Route path='/' element={<Layouts/>}>
//       <Route path='' element={<Home/>}/>
//       <Route path='about' element={<About/>}/>
//       <Route path='Contact' element={<Contact/>}/>
//       <Route path='user/:userid' element={<User/>}/>
//     </Route>
//   )
//   )
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
