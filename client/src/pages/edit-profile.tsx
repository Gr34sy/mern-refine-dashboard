import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  FormControl,
  Button,
  FormHelperText,
  TextField,
} from "@mui/material";
import { CustomButton } from "../components";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useGetIdentity } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

const editProfile = () => {
  const [profileImage, setProfileImage] = useState({
    name: "",
    url: "",
  });
  const { data: user } = useGetIdentity();
  const navigate = useNavigate();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setProfileImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!profileImage.name) return alert("Please select an image");

    //@ts-ignore
    await onFinish({ ...data, email: user.email, image: profileImage.url });
  };

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        Edit your profile
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="primary.main">
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "primary.contrastText",
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("location", { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "primary.contrastText",
              }}
            >
              Enter Phone Number
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("phone", { required: true })}
            />
          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="primary.contrastText"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Background Image
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>

            <Typography
              fontSize={14}
              color="secondary.contrastText"
              sx={{ wordBreak: "break-all" }}
            >
              {profileImage?.name}
            </Typography>
          </Stack>

          <Stack direction="row" gap={2} flexWrap="wrap">
            <CustomButton
              type="submit"
              title={formLoading ? "Submitting..." : "Submit"}
              backgroundColor="secondary.main"
              color="#fcfcfc"
            />
            <CustomButton
              title={"Back"}
              backgroundColor="secondary.main"
              color="#fcfcfc"
              handleClick={() => navigate("/my-profile")}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default editProfile;
