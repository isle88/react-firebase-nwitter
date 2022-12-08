import React from "react";

export const Nweet = ({ nweetObj, isOwner }) => {
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};
