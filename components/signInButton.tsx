import React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

const WorldIDLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 21.8182C6.32132 21.8182 2.18182 17.6787 2.18182 12C2.18182 6.32132 6.32132 2.18182 12 2.18182C17.6787 2.18182 21.8182 6.32132 21.8182 12C21.8182 17.6787 17.6787 21.8182 12 21.8182Z"
      fill="white"
    />
    <path
      d="M14.7273 9.81818V4.90909H12.7727V9.81818H14.7273ZM11.2273 9.81818V4.90909H9.27273V9.81818H11.2273ZM17.4545 12.7273H6.54545V11.2727H17.4545V12.7273ZM14.7273 19.0909V14.1818H12.7727V19.0909H14.7273ZM11.2273 19.0909V14.1818H9.27273V19.0909H11.2273Z"
      fill="white"
    />
  </svg>
);

const SignInButton: React.FC = () => {
  return (
    <Button
      variant="solid"
      color="neutral"
      startDecorator={<WorldIDLogo />}
      sx={{
        backgroundColor: "black",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      Verify with World ID
    </Button>
  );
};

export default SignInButton;
