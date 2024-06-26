import CustomButton from "./CustomButton";
import { ReviewFormProps } from "../../interfaces/common";
import {
  Box,
  Stack,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  TextareaAutosize,
} from "@mui/material";


const ReviewForm = ({
    type,
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
    propertyName,
    goBackFunction,
  }: ReviewFormProps) => {

    return (
      <Box>
        <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        {type} review for {propertyName}
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
                Number of stars &#40;up to 5&#41;
              </FormHelperText>
              <TextField
                key="amount"
               type="number"
                required
                sx={{maxWidth: '80px'}}
                id="outlined-basic"
                color="info"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 5 } }}
                {...register("rating", { required: true })}
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
                Write the review
              </FormHelperText>
              <TextareaAutosize
                minRows={5}
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
                
            <Stack direction="row" gap={2} flexWrap="wrap">
            <CustomButton type="submit" title={formLoading ? 'Submitting...' : 'Submit'} backgroundColor="secondary.main" color="#fcfcfc" />
            <CustomButton
              outlined
              title={"Back"}
              backgroundColor="secondary.main"
              color="#fcfcfc"
              handleClick={goBackFunction}
            />
            </Stack>
          </form>
        </Box>
      </Box>
  );
};

export default ReviewForm;
