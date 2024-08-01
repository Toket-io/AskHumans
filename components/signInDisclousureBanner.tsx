import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import Box from "@mui/joy/Box";

const SignInDisclosureBanner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#d9edf7",
        color: "#31708f",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <InfoIcon sx={{ fontSize: 36, marginRight: "16px" }} />
      <div>
        <p style={{ margin: 0, fontWeight: "bold" }}>
          Para entregar los resultados es necesario que hagas Sign In con World
          ID
        </p>
      </div>
    </Box>
  );
};

export default SignInDisclosureBanner;
