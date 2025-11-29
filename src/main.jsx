import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx'
import Notes from './pages/Notes.jsx'
import EditNote from './pages/EditNote.jsx'
import Archive from './pages/Archive.jsx'
import Trash from './pages/Trash.jsx'

const router = createBrowserRouter([
  {path: '/',
    element: <App />, 
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Notes />,}, 
      {path: 'edit/:noteId', element: <EditNote />}, 
      { path: 'archive', element: <Archive />},
      { path: 'trash', element: <Trash />}
  ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
