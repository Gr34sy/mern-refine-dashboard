import { AgentCardProp, InfoBarProps } from "../../interfaces/agent";
import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { useGetIdentity } from "@refinedev/core";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const InfoBar = ({icon, name}: InfoBarProps) => (
  <Stack flex={1} minWidth={{xs: '100%', sm: 300}} gap={1.5} direction="row">
    {icon}
    <Typography color="primary.contrastText">{name}</Typography>
  </Stack>
);

const AgentCard = ({
  id,
  name,
  email,
  avatar,
  location,
  phone,
  noOfProperties,
}: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    //@ts-ignore
    if (currentUser.email === email) return "/my-profile";
    return `/agent/show/${id}`;
  };

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        bgcolor: "primary.main",
        "&:hover": { boxShadow: "0 22px 45px 2px rgba(61, 57, 57, 0.1)" },
      }}
    >
      <img
        src={avatar}
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography
            fontSize={22}
            fontWeight={600}
            color="primary.contrastText"
          >
            {name}
          </Typography>
          <Typography fontSize={14} color="secondary.contrastText">
            Real-Estate Agent
          </Typography>
        </Stack>

        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
            <InfoBar 
            icon={<EmailOutlined sx={{color: 'secondary.contrastText'}} />}
            name={email}
            />
            <InfoBar 
            icon={<Phone sx={{color: 'secondary.contrastText'}} />}
            name={phone}
            />
            <InfoBar 
            icon={<Place sx={{color: 'secondary.contrastText'}} />}
            name={location}
            />
            <InfoBar 
            icon={<LocationCity sx={{color: 'secondary.contrastText'}} />}
            name={`${noOfProperties} Properties`}
            />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;
