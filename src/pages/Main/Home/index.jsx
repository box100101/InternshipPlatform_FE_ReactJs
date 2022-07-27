import { Grid } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobByName,
  getJobByNameAndLocation,
  getJobList,
} from "../../../store/slices/main/home/job/jobSlice";
import qs from "query-string";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [valueSearch, setValueSearch] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get global state from redux store
  const { jobListName, jobDetail, indexCardActive } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: 0,
      limit: 10,
    };
    dispatch(getJobByNameAndLocation(dataSearch));
    dispatch(getJobList());
  }, [dispatch]);

  // const generateNameId = (name) => {
  //   encodeURIComponent(name)
  //     .replace(/\s/g, "-")
  //     .replace(/%/g, "")
  //     .replace("%20", "+");
  // };

  const handleSearch = (value) => {
    setValueSearch(value);
    const dataSearch = {
      name: valueSearch || "",
      province: locationValue || "",
      no: 0,
      limit: 10,
    };
    if (valueSearch && value) {
      dispatch(getJobByNameAndLocation(dataSearch));
      navigate(
        `/` +
          `?name=${valueSearch || ""}&province=${
            encodeURIComponent(locationValue)
              .replace(/%20/g, "+")
              .replace(/\s/g, "-") || ""
          }&no=0&limit=10`
      );
    }
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };
  return (
    <>
      {jobDetail && (
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: "18px" }}
          container
        >
          <Grid item lg={2} md={3} sm={4} xs={12}>
            <SideBarHomeList />
          </Grid>
          <Grid item lg={4} md={8} sm={8} xs={12}>
            <div className="onDesktop">
              <SearchResultHome
                onClick={handleSearch}
                onChange={getValueLocationAndHandle}
              />
            </div>

            <FilterPanelHome
              jobList={jobListName.contents}
              indexCardActive={indexCardActive}
            />
          </Grid>
          <Grid item lg={6} className="onTablet">
            <div className="containerDetailCard containerDetailCard-none">
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
              <DetailCard
                logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                jobDetail={jobDetail}
                jobListName={jobListName.contents}
                candidate={props.candidate}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
