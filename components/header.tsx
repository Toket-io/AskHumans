import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import SignInButton from "./signInButton";
import { Box } from "@mui/joy";

export default function Header() {
  const { data: session, status } = useSession();

  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const handleSignIn = () => {
    signIn("worldcoin"); // when worldcoin is the only provider
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header
      style={{
        padding: "16px",
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ margin: 0 }}>Ask Humans</h1>
      {session?.user ? (
        <div style={{}}>
          <span>
            <small>Signed in as</small>
            <br />
            <small>{session.user.email ?? session.user.name}</small>
          </span>

          {/* <span style={{ marginRight: "16px" }}>Signed in as User</span> */}

          <button
            onClick={handleSignOut}
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <SignInButton onClick={handleSignIn} />
      )}
    </header>
  );
}
