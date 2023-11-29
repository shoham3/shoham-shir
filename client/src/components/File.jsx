import { useState } from "react";

function File(props) {
    // const [info,setInfo]=useState(false);
    function handleFolderClick() {}
    async function deleteFile(filename){
        try{
      const deletefile= await fetch(`http:localhost:4000/${username}/file/${props.name}`,{
        method: 'DELETE'});
        if(!deletefile.ok){ throw new Error ('there is an error')}}
        catch(err){console.log(err);}
    }
    // async function copy(filename){
    // const copyFile=  await fetch(`http:localhost:4000/${username}/file/${props.name}`,{
    //     mathod:
    // })
    // }
    return (
      <div className="file-container">
        {!props.isdir ? (
          <>
            <h1>
              File Name: {props.name}.{props.type}
            </h1>
            <p>File Size:{props.size}</p>
          </>
        ) : (
          <h1 onClick={handleFolderClick}>
            Folder Name: {props.name}.{props.type}
          </h1>
        )}
      </div>
    );
  }
  export default File;
  //put on the info button a function that will change the setInfo to true .