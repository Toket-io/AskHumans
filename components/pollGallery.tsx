import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Chip, Grid, CircularProgress } from "@mui/joy";
import { formatDistanceToNow, parseISO, isBefore, subHours } from "date-fns";
import { es } from "date-fns/locale";
import { Poll } from "../lib/types"; // Import the Poll type from the types file

const PollsGallery: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/polls");
        const data = await response.json();
        setPolls(data.polls as Poll[]); // Cast the response to Poll[]
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <Typography level="h1" mb={2}>
        Encuestas abiertas
      </Typography>

      <Grid container spacing={2}>
        {polls.length > 0 &&
          polls.map((poll) => {
            const createdAt = new Date(poll.timestamp);
            const isNew = isBefore(subHours(new Date(), 24), createdAt);

            return (
              <Grid key={poll.id} xs={12} sm={12} md={12}>
                <Card
                  variant="outlined"
                  sx={{ padding: "16px", position: "relative" }}
                >
                  <Typography level="h2" sx={{ mb: 1 }}>
                    {poll.title}
                  </Typography>
                  <Typography level="body-md" sx={{ mb: 1 }}>
                    Creada hace{" "}
                    {formatDistanceToNow(createdAt, {
                      locale: es,
                    })}
                  </Typography>
                  <Typography level="body-md" sx={{ mb: 1 }}>
                    {poll.questions.length} preguntas
                  </Typography>
                  {isNew && (
                    <Chip
                      variant="soft"
                      color="primary"
                      size="sm"
                      sx={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                      }}
                    >
                      Nueva
                    </Chip>
                  )}
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default PollsGallery;
