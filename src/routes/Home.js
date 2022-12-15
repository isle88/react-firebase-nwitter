import { Nweet } from "components/Nweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { NweetFactory } from "components/NweetFactory";

export const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArr);
      });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.userId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
