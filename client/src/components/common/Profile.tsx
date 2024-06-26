import { ProfileProps, PropertyProps } from "../../interfaces/common";
import PropertyCard from "./PropertyCard";
import { Email, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import ReviewCard from "./ReviewCard";

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Profile = ({
  type,
  name,
  avatar,
  phone,
  email,
  location,
  properties,
  reviews,
  img,
}: ProfileProps) => {

  return (
    <Box>
      {type !== "My" && <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
          Agent Profile
      </Typography>}

      <Box mt="10px" borderRadius="15px" padding="20px" bgcolor="primary.main">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
          }}
        >
          <img
            src={img || "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"}
            width={340}
            height={320}
            alt="user background image"
            className="my_profile-bg"
          />
          <Box
            flex={1}
            sx={{
              marginTop: { md: "58px" },
              marginLeft: { xs: "20px", md: "0px" },
            }}
          >
            <Box
              flex={1}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap="20px"
            >
              <img
                src={
                  checkImage(avatar)
                    ? avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                width={78}
                height={78}
                alt="user_profile"
                className="my_profile_user-img"
              />

              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap="30px"
              >
                <Stack direction="column">
                  <Typography fontSize={22} fontWeight={600} color="primary.contrastText">
                    {name}
                  </Typography>
                  <Typography fontSize={16} color="secondary.contrastText">
                    Realestate Agent
                  </Typography>
                </Stack>

                <Stack direction="column" gap="30px">
                  <Stack direction="row" flexWrap="wrap" gap="30px">
                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="secondary.contrastText"
                      >
                        Address
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Place sx={{ color: "primary.contrastText" }} />
                        <Typography fontSize={14} color="primary.contrastText">
                          {location}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="secondary.contrastText"
                      >
                        Email
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Email sx={{ color: "primary.contrastText" }} />
                        <Typography fontSize={14} color="primary.contrastText">
                          {email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="secondary.contrastText"
                      >
                        Phone Number
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Phone sx={{ color: "primary.contrastText" }} />
                        <Typography fontSize={14} color="primary.contrastText" noWrap>
                          {phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {properties.length > 0 && (
        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="primary.main">
          <Typography fontSize={18} fontWeight={600}>
            {type} Properties
          </Typography>

          <Box
            mt={2.5}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
            }}
          >
            {properties?.map((property: PropertyProps) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                price={property.price}
                photo={property.photo}
              />
            ))}
          </Box>
        </Box>
      )}

      {reviews.length > 0 && (
        <Box mt={2.5} borderRadius="15px" >
          <Typography fontSize={18} fontWeight={600}>
            {type} Reviews
          </Typography>

          <Box
            mt={1.5}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
            }}
          >
            {/* @ts-ignore */}
            {reviews?.map((review) => (
              // @ts-ignore
              <ReviewCard
              key={review._id}
              id={review._id}
              property={review.property}
              rating={review.rating}
              description={review.description}
              showRatingNumber={true}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
