import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function ShowFile() {
  const [content, setContent] = useState("");
  // const { filename, username } = useParams();
  const location = useLocation();

  useEffect(() => {
    fileContent();
  }, []);

  async function fileContent() {
    console.log(`sending file request`);
    const urlPath = location.pathname;
    console.log(urlPath)
    const info = await fetch(
      `http://localhost:4000${urlPath}`
    );
    const data = await info.text();
    setContent(data);
  }

  return <div>{JSON.stringify(content)}</div>;
}

export default ShowFile;
