import { Box, Stack, Typography, FormControl, Button, FormHelperText, TextField, TextareaAutosize, Select, MenuItem } from '@mui/material';
import { FormProps } from '../../interfaces/common';
import CustomButton from './CustomButton';

const Form = ({type,register,handleSubmit, handleImageChange, formLoading, onFinishHandler, propertyImage} : FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        {type} a Property
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="primary.main">
          <form style={{marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'}} onSubmit={handleSubmit(onFinishHandler)}>
            <FormControl>
              <FormHelperText>
                Enter Property Name
              </FormHelperText>
              <TextField>

              </TextField>
            </FormControl>
          </form>
      </Box>
    </Box>
  )
}

export default Form
