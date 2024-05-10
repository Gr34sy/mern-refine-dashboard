import { useGetIdentity, useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { Profile } from "../components";
import { Box, Typography, Stack } from "@mui/material";
import { EditLocationAlt } from "@mui/icons-material";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";

const agentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const navigate = useNavigate();

  const myProfile = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="Agent"
      // @ts-ignore
      img={myProfile.img}
      // @ts-ignore
      name={myProfile.name}
      // @ts-ignore
      email={myProfile.email}
      // @ts-ignore
      phone={myProfile.phone || "not set"}
      // @ts-ignore
      location={myProfile.location || "not set"}
      // @ts-ignore
      avatar={myProfile.avatar}
      // @ts-ignore
      properties={myProfile.allProperties}
    />
  );
};

export default agentProfile;
