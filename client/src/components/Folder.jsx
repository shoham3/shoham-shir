import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

function Folder() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const { foldername, username } = useParams();
  
    useEffect(() => {
      folderContent();
    }, []);
  
    async function folderContent() {
      try {
        const info = await fetch(`http://localhost:4000/${username}/${foldername}`);
        const data = await info.text();
        setContent(data);
      } catch (error) {
        console.error("Error fetching folder content:", error);
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <div>
        {loading ? <p>Loading...</p> : <pre>{JSON.stringify(content, null, 2)}</pre>}
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
