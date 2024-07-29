import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import SignInButton from "./signInButton";
import { Box } from "@mui/joy";

export default function Header() {
  const { data: session, status } = useSession();

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
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <h1 style={{ margin: 0 }}>Ask Humans</h1>

      {!session && (
        <>
          <SignInButton onClick={handleSignIn} />
        </>
      )}

      {session?.user && (
        <>
          {session.user.image && (
            <span
              style={{ backgroundImage: `url('${session.user.image}')` }}
              className={styles.avatar}
            />
          )}
          <span className={styles.signedInText}>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
          <a
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
          >
            Sign out
          </a>
        </>
      )}
    </header>
  );
}
