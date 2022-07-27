import "./styles.scss";
import React from "react";
import CandidateCard from "./CandidateCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CandidateList = () => {
  return (
    <div class="candidate-list__wrapper">
      <CandidateCard />
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default CandidateList;
