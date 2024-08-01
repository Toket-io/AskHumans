import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
import Box from "@mui/joy/Box";

interface SuccessBannerProps {
  totalResponses: number | null;
}

const SuccessBanner: React.FC<SuccessBannerProps> = ({ totalResponses }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#dff0d8",
        color: "#3c763d",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 36, marginRight: "16px" }} />
      <div>
        <p style={{ margin: 0, fontWeight: "bold" }}>
          ¡Gracias por responder este cuestionario!
        </p>
        {totalResponses && (
          <p style={{ margin: 0 }}>
            Eres uno de los {totalResponses} humanos que han respondido el
            cuestionario.
          </p>
        )}
        <p style={{ margin: 0 }}>
          Puedes encontrar los resultados <Link href="/results">aquí</Link>.
        </p>
      </div>
    </Box>
  );
};

export default SuccessBanner;
