import { AppRouter } from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
      <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        "Initialising"
        )}
    </>
  )
}

export default App;
