import { Button, ButtonProps } from "@mui/material";

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        backgroundColor: "#176326",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#13471d",
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      {...props}
      sx={{
        borderColor: "#cccccc",
        color: "#cccccc",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderColor: "#aaaaaa",
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
};
