import { useGetIdentity, useOne } from "@refinedev/core";
import { Profile } from "../components";
import { Box, Typography, Stack } from "@mui/material";
import { EditLocationAlt } from "@mui/icons-material";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    // @ts-ignore
    id: user?.userid,
  });

  const navigate = useNavigate();

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Box>
      <Stack direction="row" flexWrap="wrap" gap="15px" alignItems="center" justifyContent="space-between">
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          My Profile
        </Typography>

        <CustomButton
          backgroundColor="secondary.main"
          color="#fcfcfc"
          title="Edit"
          icon={<EditLocationAlt />}
          // @ts-ignore
          handleClick={() => navigate(`edit/${user?.userid}`)}
        />
      </Stack>

      <Profile
      type="My"
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
    </Box>
  );
};

export default MyProfile;
