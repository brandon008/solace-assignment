import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size="small"
      variant="standard"
      fullWidth
      sx={{
        "& .MuiInput-underline:before": {
          borderBottomColor: "#ccc",
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: "#999",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#176326",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
