import {
  Box,
  Stack,
  Typography,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
} from "@mui/material";
import { FormProps } from "../../interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  propertyImage,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        {type} a Property
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
              Enter Property Name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("title", { required: true })}
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
              Enter Property Description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              placeholder="Write description"
              required
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: 16,
                borderRadius: 6,
                padding: 10,
                borderColor: "#919191",
                color: "#919191",
              }}
              {...register("description", { required: true })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "primary.contrastText",
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="apartment"
                {...register("propertyType", { required: true })}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
              </Select>
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
                Enter Property Price
              </FormHelperText>
              <TextField
              type="number"
                fullWidth
                required
                id="outlined-basic"
                color="info"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                {...register("price", { required: true })}
              />
            </FormControl>
          </Stack>

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

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="primary.contrastText"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo
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
            <Typography fontSize={14} color="secondary.contrastText" sx={{wordBreak: 'break-all'}}>
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton type="submit" title={formLoading ? 'Submitting...' : 'Submit'} backgroundColor="secondary.main" color="#fcfcfc" />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
