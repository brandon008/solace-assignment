"use client";

import React, { useEffect, useState, useRef } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { formatPhoneNumber } from "@/utils/formatters";
import Header from "@/components/Header";
import { SearchInput } from "../components/Inputs";
import { Advocate } from "@/types/advocate";
import { PrimaryButton } from "@/components/Buttons";
import { Box } from "@mui/material";
import { debounce } from "@/utils/debounce";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);
  // use useRef to get the input value and avoid re-renders
  // get rid of the dangerously set inner html
  useEffect(() => {
    const runFilter = debounce((value: string) => {
      const filtered = advocates.filter((advocate) => {
        return (
          advocate.firstName?.toLowerCase().includes(value.toLowerCase()) ||
          advocate.lastName?.toLowerCase().includes(value.toLowerCase()) ||
          advocate.city?.toLowerCase().includes(value.toLowerCase()) ||
          advocate.degree?.toLowerCase().includes(value.toLowerCase()) ||
          advocate.specialties
            ?.join(", ")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          advocate.yearsOfExperience?.toString().includes(value)
        );
      });

      setFilteredAdvocates(filtered);
    }, 300);

    runFilter(searchTerm);
  }, [searchTerm, advocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const onResetClick = () => {
    console.log(advocates);
    setSearchTerm("");
    console.log("resetting advocates...");
    setFilteredAdvocates(advocates);
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
    {
      field: "degree",
      headerName: "Degree",
      width: 150,
    },
    {
      field: "specialties",
      headerName: "Specialties",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {params.value?.join(", ")}
        </div>
      ),
    },
    {
      field: "yearsOfExperience",
      headerName: "Years of Experience",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <span>{formatPhoneNumber(params.value.toString())}</span>
      ),
    },
  ];

  return (
    <main style={{ margin: "24px" }}>
      <Header text="Solace Advocates" sx={{ borderRadius: 2 }} />
      <br />
      <br />
      <div>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <SearchInput
              value={searchTerm}
              onChange={onChange}
              placeholder="Search for advocates..."
            />
          </Box>

          {searchTerm && (
            <PrimaryButton onClick={onResetClick}>Reset</PrimaryButton>
          )}
        </Box>
      </div>
      <br />
      <br />
      <DataGrid
        rows={filteredAdvocates}
        columns={columns}
        getRowId={(row) => row.id || row.phoneNumber}
        disableRowSelectionOnClick
      />
    </main>
  );
}
