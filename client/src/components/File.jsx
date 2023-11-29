function File(props) {
  function handleFolderClick() {}
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
