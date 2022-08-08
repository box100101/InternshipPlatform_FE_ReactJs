import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardHome from "../CardHome";
import moment from "moment";
import { Pagination, Stack } from "@mui/material";
import "./styles.scss";
import { useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, jobList, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FilterPanelHome = ({
  jobList,
  indexCardActive,
  positionJobValue,
  positionValue,
  onChange,
  jobListNameHavePages,
}) => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const handlePagination = (page) => {
    onChange && onChange(page);
  };
  return (
    <Box className="filter-panel-home__wrapper" sx={{}}>
      <Box className="filter-panel-home__filterPanel" sx={{}}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Mới nhất" {...a11yProps(0)} />
          <Tab label="Đánh giá" {...a11yProps(1)} />
          <Tab label="Liên quan" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel className="tabPanel" value={value} index={0}>
        {jobList && jobList?.length > 0
          ? jobList.map((job, index) => (
              <CardHome
                positionValue={positionValue}
                id={job.id}
                active={indexCardActive}
                index={index}
                key={job.id}
                title={job.name}
                fontSize={10}
                nameCompany={job.hr?.company?.name || job?.universityDTO.name}
                idCompany={job.hr?.company?.id || job?.universityDTO.id}
                tagName={[
                  job?.jobposition?.name || job?.position.name || "Unknown",
                  job?.jobType?.name || "Unknown",
                ]}
                star={job?.hr?.company?.rates?.length || 4}
                location="Hồ Chí Minh"
                amount={job.amount || "Unknown"}
                demandPartner={true}
                time={[
                  moment(job.timeStartStr || job.createDate).format(
                    "DD/MM/YYYY"
                  ),
                  moment(job.timeEndStr || job.end).format("DD/MM/YYYY"),
                ]}
                locationPath={location.pathname}
              />
            ))
          : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <CardHome /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <CardHome /> */}
      </TabPanel>
      {/* <Stack spacing={2}>
        <Pagination
          page={jobListNameHavePages?.numberOfCurrentPage || 0}
          defaultPage={1}
          onChange={(e) => handlePagination(e.target.textContent)}
          count={jobListNameHavePages?.totalPages || 1}
          variant="outlined"
          shape="rounded"
          size="medium"
          // disabled={
          //   jobListNameHavePages?.numberOfCurrentPage === 1 ||
          //   jobListNameHavePages?.numberOfCurrentPage ===
          //     jobListNameHavePages?.totalPages
          // }
        />
      </Stack> */}
    </Box>
  );
};
export default FilterPanelHome;
