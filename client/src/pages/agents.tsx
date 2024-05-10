import { useList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";

import { AgentCard } from "../components";
import LoadingScreen from "../components/common/LoadingScreen";

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });

  const allAgents = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        Agents List
      </Typography>

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            location={agent.location || "unknown"}
            phone={agent.phone || "unknown"}
            noOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
