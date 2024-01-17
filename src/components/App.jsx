import React, { useState} from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {
  const [search, setSearch] = useState({
    search: '',
  });
  

  const handleClickSubmit = ({search})=> {
    setSearch(search)
  } 
  
  

  return (
  <div className="App">
      <Searchbar handleClickSubmit={handleClickSubmit} />
      <ImageGallery searchWord={search} />
      <ToastContainer />
  </div>
  )
}








