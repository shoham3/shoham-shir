import { useEffect, useState } from "react";

function Home() {
  const [content, setContent] = useState([]);
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    async function fetchContent() {
      const res = await fetch(
        `http://localhost:4003/users/${currentUser.id}/home/content`
      );
      const data = await res.json();
      setContent((prev) => [...prev, data]);
    }

    fetchContent();
  }, [content]);

  return (
    <div>
      {content.length != 0 &&
        content.map((file) => {
          <File
            filename={file.name}
            type={file.type}
            isdir={file.isdir}
            size={file.size}
          />;
        })}
    </div>
  );
}

export default Home;
