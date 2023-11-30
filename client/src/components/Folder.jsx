import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import File from "./File";

function Folder() {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const { foldername, username } = useParams();
  
    useEffect(() => {
      folderContent();
    }, []);
  
    function removeFile(filename) {
        console.log(filename);
        setContent((prev) => [...prev].filter((file) => file.name !== filename));
      }

    async function folderContent() {
      try {
        const info = await fetch(`http://localhost:4000/${username}/${foldername}`);
        const data = await info.json();
        console.log(data)
        setContent(data);
      } catch (error) {
        console.error("Error fetching folder content:", error);
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <div>
        {loading ? <p>Loading...</p> : <div>
      {content.length !== 0 &&
        content.map((file) => {
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
    </div>}
      </div>
    );
  }
export default Folder;  
// function Folder(){
//         const [content, setContent] = useState("");
//         const { foldername, username } = useParams();
//         useEffect(() => {
//           folderContent();
//         }, []);
      
//         async function folderContent() {
//           const info = await fetch(
//             `http://localhost:4000/${username}/${foldername}`
//           );
//           const data = await info.text();
//           setContent(data);
//         }
      
//         return <div>{JSON.stringify(content)}</div>;
//       }
// export default Folder;
