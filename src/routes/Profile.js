import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myNweet, setMyNweet] = useState([]);
  const onSignOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweet = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("userId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    setMyNweet(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweet();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn signOut" onClick={onSignOutClick}>
        Sign Out
      </span>
      {myNweet &&
        myNweet.map((nweet) => (
          <section key={nweet.createdAt}>
            {nweet.createdAt}
            {nweet.text}
          </section>
        ))}
    </div>
  );
};
