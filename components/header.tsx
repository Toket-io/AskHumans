import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import SignInButton from "./signInButton";
import { Box, Button, Typography } from "@mui/joy";

export default function Header() {
  const { data: session, status } = useSession();

  // Truncate user id to first 4 and last 4 characters
  const userId = session?.user?.name
    ? `${session.user.name.slice(0, 5)}...${session.user.name.slice(-5)}`
    : null;

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
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <h1 style={{ margin: 0 }}>Ask Humans</h1>
      {session?.user ? (
        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <Typography mb={1} sx={{ color: "white" }} level="body-md">
            Signed in as {userId}
          </Typography>
          <Button size="sm" color="neutral" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
      ) : (
        <SignInButton onClick={handleSignIn} />
      )}
    </header>
  );
}
