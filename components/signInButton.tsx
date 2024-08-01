import React from "react";
import Button from "@mui/joy/Button";
import Image from "next/image";

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="solid"
      color="neutral"
      startDecorator={
        <Image
          src="/assets/worldcoin-logo.svg"
          alt="Worldcoin Logo"
          width={24}
          height={24}
        />
      }
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      sx={{
        backgroundColor: "white",
        color: "black",
        padding: "12px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      Sign In con World ID
    </Button>
  );
};

export default SignInButton;
