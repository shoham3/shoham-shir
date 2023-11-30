function File(props) {
    function handleFolderClick() {}
    //  async function showInfo(id){
    //     const info= await fetch(`http://localhost:4000/${username}/file/${id}`);
    //     const data = await info.json();
    //   }
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
          body: { newname: `${prompt}` },
        }
      );
      console.log(rename);
      if (rename.status === 200) {
        setName(prompt);
      }
    }
    console.log(props);
    function copy(id) {}
    function move(id) {}
    async function deleteFile(filename){
        try{
      const deletefile= await fetch(`http//:localhost:4000/${username}/file/${filename}`,{
        method: 'DELETE'});
        if(!deletefile.ok){ throw new Error ('there is an error')}}
        catch(err){console.log}
      }
      // async function showFolder(){
      //   const folder= await fetch('http://')
      // }
  return (
    <div className="file-container">
      {!props.isdir ? (
        <>
          <h1>File Name: {name}</h1>
          <div>
            <button onClick={() => showInfo(props.name)}>info</button>
            <button onClick={() => showFile(props.name)}>Show</button>
            <button onClick={() => rename(props.name)}>Rename</button>
            <button onClick={() => copy(props.id)}>Copy</button>
            <button onClick={() => move(props.id)}>Move</button>
            <button onClick={() => deleteFile(props.id)}>Delete</button>
          </div>
          {/* <p>File Size:{props.size}</p> */}
        </>
      ) : (<>
        <h1 onClick={handleFolderClick}>Folder Name: {name}</h1>
        {/* <button onClick={() => showFolder(props.name)}>show folder</button> */}
</>
      )}
    </div>
  );
}export default File;