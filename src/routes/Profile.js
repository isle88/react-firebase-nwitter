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
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onSignOutClick}>Sign Out</button>
      {myNweet &&
        myNweet.map((nweet) => (
          <section key={nweet.createdAt}>
            {nweet.createdAt}
            {nweet.text}
          </section>
        ))}
    </>
  );
};
