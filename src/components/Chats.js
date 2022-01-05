import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./Firebase";
import axios from "axios";
import { ChatEngine } from "react-chat-engine";

// styles
import styles from "./Chats.module.css";
import spinner from "../Svg/Disk-1s-200px.svg";
// context
import { authContext } from "../Contexts/AuthContext";
// components

const Chats = () => {
  const history = useHistory();
  const user = useContext(authContext);
  const [loading, setLoading] = useState(true);

  const logoutHandler = async () => {
    await auth.signOut();
    history.push("/");
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "b494020a-b4bc-45ab-b182-97e3b2584bee",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
        });
        axios
          .post("https://api.chatengine.io/users/", formdata, {
            headers: {
              "private-key": "f2e59e6e-e8c7-4738-b8b5-163243a74e6b",
            },
          })
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [user, history]);

  const getFile = async (photoURl) => {
    let response = await fetch(photoURl, {
      mode: "cors",
    });
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  if (!user || loading)
    return (
      <div className={styles.loading}>
        <img src={spinner} alt="loading" />
        <h1> L O A D I N G . . .</h1>
      </div>
    );

  return (
    <div>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <h2> Messenger</h2>
        </div>
        <div onClick={logoutHandler} className={styles.logout}>
          logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 70px )"
        projectID="b494020a-b4bc-45ab-b182-97e3b2584bee"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
