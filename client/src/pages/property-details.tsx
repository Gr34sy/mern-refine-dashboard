import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const propertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

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
              borderColor: "secondary.contrastText"}}
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
                <Typography fontSize={18} fontWeight={600} color="primary.contrastText">
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
                <Place sx={{ color: "secondary.contrastText" }} />
                <Typography fontSize={14} fontWeight={400} color="secondary.contrastText">
                  North Carolina, USA
                </Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="primary.contrastText">
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
                title={"Edit"}
                backgroundColor="secondary.main"
                color="#FCFCFC"
                fullWidth
                icon={<Edit />}
                handleClick={() => {}}
              />
              <CustomButton
                title={"Delete"}
                backgroundColor="#2ED480"
                color="#FCFCFC"
                fullWidth
                icon={<Delete />}
                handleClick={() => {}}
              />
            </Stack>
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="secondary.main"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default propertyDetails;
