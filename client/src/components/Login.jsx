import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4003/home", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
        }),
      });
      localStorage.setItem("currentUser", JSON.stringify(res.json()));
      console.log(res);
      res.status === 200 && navigate(`users/${res.body.id}/home`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={(e) => handleLogin(e)} method="POST">
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}

export default Login;
