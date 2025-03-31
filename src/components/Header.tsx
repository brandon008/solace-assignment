import { Box, SxProps, Typography } from "@mui/material";

interface HeaderProps {
  text: string;
  backgroundColor?: string;
  sx?: SxProps;
}

const Header = ({ text, backgroundColor = "#1f3d32", sx }: HeaderProps) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Typography variant="h4" color="white">
        {text}
      </Typography>
    </Box>
  );
};
export default Header;
