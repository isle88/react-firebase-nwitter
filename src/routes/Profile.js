import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Profile = ({ userObj }) => {
  const history = useHistory();
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
  };
  useEffect(() => {
    getMyNweet();
  }, []);
  return (
    <>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
};
