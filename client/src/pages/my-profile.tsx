import { useGetIdentity, useOne } from "@refinedev/core";
import { Profile } from "../components";
import { Box, Typography, Stack } from "@mui/material";
import { EditLocationAlt } from "@mui/icons-material";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    // @ts-ignore
    id: user?.userid,
  });

  const navigate = useNavigate();

  const myProfile = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>error...</div>;

  return (
    <Box>
      <Stack direction="row" flexWrap="wrap" gap="15px" alignItems="center" justifyContent="space-between">
        <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
          My Profile
        </Typography>

        <CustomButton
          backgroundColor="secondary.main"
          color="#fcfcfc"
          title="Edit"
          icon={<EditLocationAlt />}
          // @ts-ignore
          handleClick={() => navigate(`edit/${myProfile._id}`)}
        />
      </Stack>

      <Profile
      type="My"
      // @ts-ignore
      img={myProfile.image}
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
      // @ts-ignore
      reviews={myProfile.allReviews}
    />
    </Box>
  );
};

export default MyProfile;
