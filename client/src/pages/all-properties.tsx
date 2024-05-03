import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { PropertyCard, CustomButton } from "../components";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    sorters,
    setSorters,
    filters,
    setFilters,
    pageCount,
  } = useTable();
  console.log(data);

  const allProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography
            fontSize={25}
            fontWeight={700}
            color="primary.contrastText"
          >
            {!allProperties.length
              ? "There are no properties"
              : "All properites"}
            <Box
              mb={2}
              mt={3}
              display="flex"
              width="84%"
              justifyContent="space-between"
              flex-wrap="wrap"
            >
              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                mb={{ xs: "20px", sm: 0 }}
              >
                <CustomButton
                  title={`Sort price`}
                  handleClick={() => {}}
                  backgroundColor="secondary.main"
                  color="#fcfcfc"
                />
                <TextField
                  variant="outlined"
                  color="info"
                  placeholder="Search by title"
                  value=""
                  onChange={() => {}}
                />
                <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue=""
                  value=""
                  onChange={() => {}}
                >
                  <MenuItem value="">All</MenuItem>
                </Select>
              </Box>
            </Box>
          </Typography>
        </Stack>
      </Box>

      <CustomButton
        title="Add Property"
        handleClick={() => navigate("/properties/create")}
        icon={<Add />}
        backgroundColor="secondary.main"
        color="#fcfcfc"
      />

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>

      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="secondary.main"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="secondary.main"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={() => {}}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>Show {size}</MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
