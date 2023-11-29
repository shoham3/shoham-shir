import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowFile() {
  const [content, setContent] = useState("");
  const { filename, username } = useParams();
  useEffect(() => {
    fileContent();
  }, []);

  async function fileContent() {
    const info = await fetch(
      `http://localhost:4000/${username}/file/${filename}`
    );
    const data = await info.text();
    setContent(data);
  }

  return <div>{JSON.stringify(content)}</div>;
}

export default ShowFile;
