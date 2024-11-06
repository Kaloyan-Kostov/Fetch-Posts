import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts/Posts";
import CreatePost from "./components/CreatePost/CreatePost";

function App() {
  return (
    <div>
      <Posts />
      {/* <CreatePost /> */}
    </div>
  );
}

export default App;
