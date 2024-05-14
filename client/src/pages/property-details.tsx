import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow, useOne } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import {
  AccountCircle,
  AlternateEmail,
  Delete,
  Edit,
  Email,
  Place,
  Star,
  Stars,
} from "@mui/icons-material";
import LoadingScreen from "../components/common/LoadingScreen";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const propertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  //@ts-ignore
  const isCurrentUser = user.email === propertyDetails.creator.email;

  // @ts-ignore
  const wasAlreadyReviewed = propertyDetails.reviewedByUsers.includes(user.userid);
  // @ts-ignore
  console.log(wasAlreadyReviewed);

  const handleDeleteProperty = () => {
    const response = confirm("Are you sure you want to delete this property?");
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="primary.main"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        Details
      </Typography>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetails.photo}
            alt={propertyDetails.title}
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={16}
                fontWeight={500}
                color="primary.contrastText"
                textTransform="capitalize"
              >
                {propertyDetails.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} />
                ))}
              </Box>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Box>
                <Typography
                  fontSize={26}
                  fontWeight={500}
                  color="primary.contrastText"
                  textTransform="capitalize"
                >
                  {propertyDetails.title}
                </Typography>

                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "primary.contrastText" }} />
                  <Typography color="secondary.contrastText" fontSize={16}>
                    {propertyDetails.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                  color="primary.contrastText"
                >
                  Price
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography
                    fontSize={25}
                    fontWeight={700}
                    color="secondary.main"
                  >
                    ${propertyDetails.price}
                  </Typography>
                  <Typography fontSize={14} color="#808191" mb={0.5}>
                    / day
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={16} color="primary.contrastText">
                Description
              </Typography>
              <Typography fontSize={14} color="secondary.contrastText">
                {propertyDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "secondary.contrastText",
            }}
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  checkImage(propertyDetails.creator.avatar)
                    ? propertyDetails.creator.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt="15px">
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="primary.contrastText"
                >
                  {propertyDetails.creator.name}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={300}
                  color="primary.contrastText"
                >
                  Agent
                </Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <AlternateEmail sx={{ color: "secondary.contrastText" }} />
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  color="secondary.contrastText"
                >
                  {propertyDetails.creator.email}
                </Typography>
              </Stack>

              <Typography
                mt={1}
                fontSize={16}
                fontWeight={600}
                color="primary.contrastText"
              >
                {propertyDetails.creator.allProperties.length} Properties
              </Typography>
            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="secondary.main"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Email /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/properties/edit/${propertyDetails._id}`);
                  } else {
                    window.location.href = `mailto:${propertyDetails.creator.mail}?subject=Subject&body=message%20goes%20here`;
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Profile" : "Delete"}
                backgroundColor={!isCurrentUser ? "secondary.main" : "#d42e2e"}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <AccountCircle /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) {
                    handleDeleteProperty();
                  } else {
                    navigate(`/agents/show/${propertyDetails.creator._id}`);
                  }
                }}
              />
            </Stack>
          </Stack>

          <Box>
            <iframe
              style={{
                border: "none",
                borderRadius: "5px",
              }}
              width="100%"
              height="370"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?&q="+${propertyDetails.location}"&output=embed`}
            ></iframe>
          </Box>

          <Box>
            {!isCurrentUser && (
              <CustomButton
                title={wasAlreadyReviewed ? "Edit Review" : "Review"}
                backgroundColor={"#2ED480"}
                color="#FCFCFC"
                fullWidth
                icon={<Stars />}
                handleClick={() => {
                  if (!isCurrentUser) {
                    navigate(`/reviews/create/${propertyDetails._id}`);
                  }
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default propertyDetails;
