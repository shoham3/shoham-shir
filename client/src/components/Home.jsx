import { useState, useEffect } from "react";
import File from "./File";
import { Outlet } from "react-router-dom";

function Home() {
  const [content, setContent] = useState([]);
  const currentUser = localStorage.getItem("currUser");
  //   console.log(currentUser);

  useEffect(() => {
    async function fetchContent() {
      const res = await fetch(`http://localhost:4000/${currentUser}`);
      const data = await res.json();
      // console.log(data)
      setContent((prev) => [...data]);
    }
    console.log("hi" + currentUser);
    fetchContent();
  }, [currentUser]);

  //   console.log(content);

  function removeFile(filename) {
    console.log(filename);
    setContent((prev) => [...prev].filter((file) => file.name !== filename));
  }

  return (
    <div>
      {content.length != 0 &&
        content.map((file) => {
          console.log(file);
          return (
            <File
              removeFile={removeFile}
              key={file.id}
              name={file.name}
              type={file.type}
              isdir={file.isDir}
              size={file.size}
            />
          );
        })}
    </div>
  );
}
export default Home;

// import React from 'react';

// // Assuming 'File' is another component defined somewhere in your code.

// function Home() {
//     const [content, setContent] = useState([]);
//     const currentUser = localStorage.getItem("currentUser");

//     useEffect(() => {
//         async function fetchContent() {
//             const res = await fetch(
//                 `http://localhost:4000/${currentUser}`
//             );
//             const data = await res.json();
//             setContent((prev) => [...prev, data]);
//         }

//         fetchContent();
//     }, [currentUser]); // Change the dependency to 'currentUser' to avoid unnecessary re-fetching

//     return (
//         <div>
//             {content.length !== 0 &&
//                 content.map((file) => (
//                     <File
//                         key={file.id} // Add a unique key for each item
//                         filename={file.name}
//                         type={file.type}
//                         isdir={file.isdir}
//                         size={file.size}
//                     />
//                 ))}
//         </div>
//     );
// }

// export default Home;

// import React, { useState, useEffect } from 'react';

// Assuming 'File' is another component defined somewhere in your code.

// function Home() {
//     const [content, setContent] = useState([]);
//     const [error, setError] = useState(null);
//     const currentUser = localStorage.getItem("currUser");

//     useEffect(() => {
//         async function fetchContent() {
//             try {
//                 const res = await fetch(`http://localhost:4000/${currentUser}`);

//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`);
//                 }

//                 const data = await res.json();
//                 setContent((prev) => [...prev, data]);
//             } catch (error) {
//                 setError(error.message);
//             }
//         }

//         fetchContent();
//     }, [currentUser]);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             {content.length !== 0 &&
//                 content.map((file) => (
//                     <File
//                         key={file.id} // Add a unique key for each item
//                         filename={file.name}
//                         type={file.type}
//                         isdir={file.isdir}
//                         size={file.size}
//                     />
//                 ))}
//         </div>
//     );
// }

// export default Home;
