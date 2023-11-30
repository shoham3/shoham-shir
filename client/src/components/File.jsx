import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function File(props) {
  const navigate = useNavigate();
  const [name, setName] = useState(props.name);
  const [showInfo, setShowInfo] = useState(false);
  const { username } = useParams();
  const location = useLocation();

  function handleFolderClick(foldername) {
    navigate(`${foldername}`);
  }

  function showFile(filename) {
    navigate(`file/${filename}`);
  }

  async function rename(filename) {
    const prompt = window.prompt("what name do you want to name the file ?");
    const rename = await fetch(
      `http://localhost:4000/${username}/file/${filename}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ newname: `${prompt}` }),
      }
    );
    if (rename.status === 200) {
      setName(prompt);
    }
  }

  async function deleteFile(filename) {
    const url = location.pathname;
    const fetchRequest = `http://localhost:4000/${url}/file/${filename}`;
    try {
      const deleteFile = await fetch(fetchRequest, {
        method: "DELETE",
      });
      const response = deleteFile.ok;
      response && props.removeFile(filename);
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteFolder(foldername) {
    const url = `${location.pathname.split("/")[1]}/${foldername}`;
    console.log(url);
    try {
      const folder = await fetch(`http://localhost:4000/${url}`, {
        method: "DELETE",
      });
      const response = folder.ok;
      response && props.removeFile(foldername);
    } catch (err) {
      console.log(err);
    }
  }

  function fileInfo() {
    setShowInfo(true);
  }
  return (
    <div className="file-container">
      {!props.isdir ? (
        <>
          <h1>File Name: {name}</h1>
          <div>
            <button onClick={fileInfo}>info</button>
            {showInfo && <div>file size: {props.size}</div>}
            <button onClick={() => showFile(props.name)}>Show</button>
            <button onClick={() => rename(props.name)}>Rename</button>
            <button onClick={() => copy(props.id)}>Copy</button>
            <button onClick={() => move(props.id)}>Move</button>
            <button onClick={() => deleteFile(props.name)}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <h1>Folder Name: {name}</h1>
          <button onClick={() => handleFolderClick(name)}>show folder</button>
          <button
            onClick={() => {
              deleteFolder(name);
            }}
          >
            delete folder
          </button>
        </>
      )}
    </div>
  );
}

export default File;
