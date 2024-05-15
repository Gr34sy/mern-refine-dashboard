import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow, useOne } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import ReviewCard from "../components/common/ReviewCard";
import {
  Delete,
  Info,
  Place,
  Star,
} from "@mui/icons-material";
import LoadingScreen from "../components/common/LoadingScreen";

const ReviewDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const reviewDetails = data?.data ?? {};

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  //@ts-ignore
  const isCurrentUser = user.email === reviewDetails.creator.email;

  const stars = [];
  for (let i = 0; i < reviewDetails.rating; i++) {
    stars.push(i);
  }

  const handleDeleteReview = () => {
    const response = confirm("Are you sure you want to delete this review?");
    if (response) {
      mutate(
        {
          resource: "reviews",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/reviews");
          },
        }
      );
    }
  };

  return (
    <Box>
      <Stack display="flex" gap={3} flexDirection="row" flexWrap="wrap">
        <Box
          borderRadius="15px"
          padding="20px"
          bgcolor="primary.main"
          width="fit-content"
        >
          <Box>
            <Stack
              display="flex"
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={3}
            >
              <Stack display="flex" flexDirection="column" gap={0.5}>
                <Typography
                  fontSize={26}
                  fontWeight={500}
                  color="primary.contrastText"
                  textTransform="capitalize"
                >
                  {reviewDetails.property.title}
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight={500}
                  color="primary.contrastText"
                  textTransform="capitalize"
                >
                  {reviewDetails.property.propertyType}
                </Typography>
              </Stack>

              <Box>
                {stars.map((star) => (
                  <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} />
                ))}
              </Box>
            </Stack>
          </Box>

          <Box
            mt="20px"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            gap={4}
          >
            <Box flex={1} maxWidth={764}>
              <img
                src={reviewDetails.property.photo}
                alt={reviewDetails.property.title}
                height={546}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                className="property_details-img"
              />

              <Box mt="15px">
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "primary.contrastText" }} />
                  <Typography color="secondary.contrastText" fontSize={16}>
                    {reviewDetails.property.location}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          borderRadius="15px"
          padding="20px"
          bgcolor="primary.main"
          width="fit-content"
        >
          <Stack display="flex" flexDirection="column" gap={2}>

          <Stack display="flex" flexDirection="column" gap={0.5}>
            <Typography fontSize={18} fontWeight={500}>
              {isCurrentUser ? "You reviewed" : (reviewDetails.creator.name[0].toUpperCase() + reviewDetails.creator.name.slice(1))}
            </Typography>

            <Stack display="flex" flexDirection="row" alignItems="center" gap={1}>
              <img src={reviewDetails.creator.avatar} alt={reviewDetails.creator.name} width={30} height={30} style={{borderRadius: "50%"}}/>
            <Typography fontSize={14} color="secondary.contrastText">
              {reviewDetails.creator.email}
            </Typography>
            </Stack>
           </Stack>

           <Stack display="flex" flexDirection="column" gap={0.5}>
            <Typography fontSize={16} fontWeight={500}>
              Stars
            </Typography>
            <Typography color="secondary.contrastText" fontSize={18} fontWeight={500}>
                {reviewDetails.rating}/5
            </Typography>
            </Stack>
            
            
            <Stack display="flex" flexDirection="column" gap={0.5}>
            <Typography fontSize={16} fontWeight={500}>
              Description
            </Typography>
            <Typography color="secondary.contrastText" fontSize={16}>
                {reviewDetails.description}
            </Typography>
            </Stack>
            
          </Stack>
        </Box>

        <Box>
        {isCurrentUser && (
                <CustomButton
                  title={"Delete"}
                  backgroundColor={"#d42e2e"}
                  color="#FCFCFC"
                  icon={<Delete />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      handleDeleteReview();
                    }
                  }}
                />
              )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ReviewDetails;
