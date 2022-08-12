import { Grid } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByNameAndLocation } from "../../../store/slices/main/home/job/jobSlice";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";

const Home = (props) => {
  const [locationValue, setLocationValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { profile } = useSelector((state) => state.authentication);
  // const [totalPages, setTotalPages] = useState();

  // let positionJobValue = "";
  const dispatch = useDispatch();
  // get global state from redux store
  const { jobListName, jobDetail, indexCardActive, jobListNameHavePages } =
    useSelector((state) => state.job);
  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: currentPage,
      limit: 4,
    };
    dispatch(getJobByNameAndLocation(dataSearch));
    // dispatch(getJobList([1, 10]));
  }, [dispatch, currentPage]);

  // const generateNameId = (name) => {
  //   encodeURIComponent(name)
  //     .replace(/\s/g, "-")
  //     .replace(/%/g, "")
  //     .replace("%20", "+");
  // };
  const dataGetMarkByUser = {
    userName: profile.username,
    page: {
      no: 0,
      limit: 10,
    },
  };
  useEffect(() => {
    if (profile.role === "Role_Candidate") {
      dispatch(getMarkByUser(dataGetMarkByUser));
    }
  }, []);

  const handleSearch = (value) => {
    const dataSearch = {
      name: value || "",
      province: locationValue || "",
      no: 0,
      limit: 5,
    };
    dispatch(getJobByNameAndLocation(dataSearch));
    // navigate(
    //   `/candidate` +
    //     `?name=${value || ""}&province=${
    //       encodeURIComponent(locationValue)
    //         .replace(/%20/g, "+")
    //         .replace(/\s/g, "-") || ""
    //     }&no=0&limit=10`
    // );
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  const handleCheck = (value) => {
    // positionJobValue = value;
    setPositionValue(value);
  };

  const getValuePageAndHandle = (value) => {
    setCurrentPage(value);
    // window.scroll(0, 0);
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
            <SideBarHomeList onChange={handleCheck} />
          </Grid>
          <Grid item lg={4} md={8} sm={8} xs={12}>
            <div className="onDesktop">
              <SearchResultHome
                onClick={handleSearch}
                onChange={getValueLocationAndHandle}
              />
            </div>

            <FilterPanelHome
              jobList={jobListName}
              indexCardActive={indexCardActive}
              // positionJobValue={positionJobValue}
              positionValue={positionValue}
              jobListNameHavePages={jobListNameHavePages}
              onChange={getValuePageAndHandle}
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
                jobListName={jobListName}
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
