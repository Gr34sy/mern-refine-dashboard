import { Button } from "@mui/material";

import { CustomButtonProps } from "../../interfaces/common";

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  disabled,
  outlined,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : "unset",
        padding: "10px 15px",
        width: fullWidth ? "100%" : "fit-content",
        minWidth: 130,
        backgroundColor: outlined ? color : backgroundColor,
        color: outlined ? backgroundColor : color,
        borderWidth: outlined ? "2px" : "0",
        borderStyle: outlined ? "solid" : "none",
        borderColor: outlined ? backgroundColor : "transparent",
        fontSize: 16,
        fontWeight: 600,
        gap: "10px",
        textTransform: "capitalize",
        "&:hover": outlined ? {
          opacity: 0.8,
        }: {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
