"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { formatPhoneNumber } from "@/utils/formatters";
import Header from "@/components/Header";
import { SearchInput } from "../components/Inputs";
import { Advocate } from "@/types/advocate";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { Box } from "@mui/material";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // what we're actually submitting
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchAdvocates = async () => {
      const baseUrl = searchTerm
        ? `/api/advocates/search?search=${encodeURIComponent(searchTerm)}`
        : `/api/advocates?`;

      const res = await fetch(`${baseUrl}&page=${page}&limit=${pageSize}`);
      const { data, total } = await res.json();
      setAdvocates(data);
      setRowCount(total);
    };

    fetchAdvocates();
  }, [searchTerm, page, pageSize]);

  const onSearchSubmit = () => {
    setPage(0);
    setSearchTerm(searchInput);
  };

  const onResetClick = () => {
    setSearchInput("");
    setSearchTerm("");
    setPage(0);
  };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "degree", headerName: "Degree", width: 150 },
    {
      field: "specialties",
      headerName: "Specialties",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ overflowX: "auto", whiteSpace: "nowrap", width: "100%" }}>
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, mt: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <SearchInput
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for advocates..."
          />
        </Box>
        <PrimaryButton onClick={onSearchSubmit}>Search</PrimaryButton>
        {searchTerm && (
          <SecondaryButton onClick={onResetClick}>Reset</SecondaryButton>
        )}
      </Box>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DataGrid
          rows={advocates}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          rowCount={rowCount}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          disableColumnFilter
          disableColumnSelector
          disableColumnSorting
          disableColumnMenu
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </main>
  );
}
