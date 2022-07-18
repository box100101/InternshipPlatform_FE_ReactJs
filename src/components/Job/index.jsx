import React from "react";
import PropTypes from "prop-types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Box from "@mui/material/Box";
import { Icon } from "@mui/material";
import "./styles.scss";
const JobCandidate = ({ job }) => {
  console.log(job.name);
  return (
    <Box
      sx={{
        width: 250,
        height: 147,
        border: 1,
        borderColor: "#DEDEDE",
        borderRadius: 2,
        mt: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "DEDEDE",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div className="job__candidate">
        <h4 id="job__candidate-infor-name" className="job__candidate-infor job__candidate-infor-name-job">
          {job.name}
        </h4>
        <div className="job__candidate-infor job__candidate-infor-time">
          <Icon className="job__candidate-info-item-icon">
            <AccessTimeIcon fontSize="small" />
          </Icon>
          <p>{job.timeStartStr + "-" + job.timeEndStr}</p>
        </div>

        <div className="job__candidate-infor">
          <Icon className="job__candidate-info-item-icon">
            <WorkIcon fontSize="small" />
          </Icon>
          <h6>{job.jobType.name}</h6>
        </div>
        <div className="job__candidate-infor">
          <Icon className="job__candidate-info-item-icon">
            <CurrencyExchangeIcon fontSize="small" />
          </Icon>

          <h6>{job.salaryMin} $</h6>
        </div>
        <div className="job__candidate-infor">
          <Icon className="job__candidate-info-item-icon">
            <AddLocationIcon fontSize="small" />
          </Icon>
          <h6>{job.locationjob.address + ', ' + job.locationjob.district.province.name}</h6>
        </div>
      </div>
    </Box>
  );
};

JobCandidate.propTypes = {};

export default JobCandidate;