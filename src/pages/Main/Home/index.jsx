import { Grid, Hidden } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRating } from "src/store/slices/main/home/rating/rating";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";
import DetailCard from "../../../components/DetailCard";
import FilterPanelHome from "../../../components/FilterPanelHome";
import SearchResultHome from "../../../components/SearchResultHome";
import SideBarHomeList from "../../../components/SideBarHomeList";
import {
  getJobByCompany,
  getJobFilterByUser
} from "../../../store/slices/main/home/job/jobSlice";
import "./styles.scss";

const limit = 5;
const Home = (props) => {
  const dispatch = useDispatch();
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { profile } = useSelector((state) => state.authentication);
  const { allRating } = useSelector((state) => state.rating);
  // get global state from redux store
  let {
    jobDetail,
    indexCardActive,
    jobListHavePages,
    jobFilter,
    jobListCompany,
  } = useSelector((state) => state.job);

  const [jobs, setJobs] = useState(jobFilter);
  const [type, setType] = useState([]);
  const [position, setPosition] = useState([]);
  const [major, setMajor] = useState([]);
  const idCompany = Number(jobDetail?.hr?.company?.id);
  const listPositionWorkingFormat = [
    "Backend Developer",
    "Business Analyst",
    "Data Engineer",
    "Data Scientist",
    "DevOps",
    "Frontend Developer",
    "Tester",
  ];

  useEffect(() => {
    const updateJob = () => {
      let temp = jobFilter;

      if (type.length > 0) {
        temp = temp.filter((e) => type.includes(e?.jobType?.name));
      }

      if (position.length > 0) {
        temp = temp.filter((e) => position.includes(e?.jobposition?.name));
      }
      if (major.length > 0) {
        temp = temp.filter((e) => major?.includes(e?.major?.name));
      }
      setJobs(temp);
    };
    updateJob();
  }, [type, position, major, jobFilter]);
  const [jobDetails, setJobDetails] = useState(jobs[0]);

  useEffect(() => {
    dispatch(getAllRating([0, 5]))
  }, [dispatch])
  useEffect(() => {
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: "",
      province: "",
      major: "",
      no: currentPage,
      limit: limit,
    };

    dispatch(getJobFilterByUser(dataFilter));
  }, [currentPage, dispatch]);
  useEffect(() => {
    setJobDetails(jobs[indexCardActive]);
    dispatch(getJobByCompany(Number(idCompany)));
  }, [idCompany, indexCardActive,dispatch]);
  const dataGetMarkByUser = {
    userName: profile.username,
    page: {
      no: currentPage,
      limit: limit,
    },
  };
  useEffect(() => {
    if (profile.role === "Role_Candidate") {
      dispatch(getMarkByUser(dataGetMarkByUser));
    }
  }, [idCompany]);
  useEffect(() => {
    setJobDetails(jobs[0]);
  }, [jobs]);
  const handleSearch = (value) => {
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: value || "",
      province: locationValue || "",
      major: "",
      no: currentPage -1,
      limit: limit,
    };
    dispatch(getJobFilterByUser(dataFilter));
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };
  const handleCheck = (value) => {
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];

    if (value.length > 0) {
      tempType = value.filter(
        (el) => el === "Fulltime" || el === "Parttime" || el === "Remote"
      );
    }
    setType(tempType);

    if (value.length > 0) {
      tempPosition = value.filter(
        (el) =>
          el === listPositionWorkingFormat[0] ||
          el === listPositionWorkingFormat[1] ||
          el === listPositionWorkingFormat[2] ||
          el === listPositionWorkingFormat[3] ||
          el === listPositionWorkingFormat[4] ||
          el === listPositionWorkingFormat[5] ||
          el === listPositionWorkingFormat[6]
      );
    }
    setPosition(tempPosition);

    if (value.length > 0) {
      tempMajor = value.filter(
        (el) =>
          el !== "Fulltime" &&
          el !== "Parttime" &&
          el !== "Remote" &&
          el !== listPositionWorkingFormat[0] &&
          el !== listPositionWorkingFormat[1] &&
          el !== listPositionWorkingFormat[2] &&
          el !== listPositionWorkingFormat[3] &&
          el !== listPositionWorkingFormat[4] &&
          el !== listPositionWorkingFormat[5] &&
          el !== listPositionWorkingFormat[6]
      );
    }
    setMajor(tempMajor);
  };

  const getValuePageAndHandle = (value) => {
    setCurrentPage(value);
    window.scroll(0, 0);
  };

  return (
    <>
      <Grid
        className="wrapper"
        spacing={{ xs: 1 }}
        xs={12}
        sx={{ padding: "18px" }}
        container
      >
        <Grid item lg={2} md={3} sm={4} xs={4}>
          <Hidden mdDown>
            <SideBarHomeList
              onChange={handleCheck}
              slideBarHome__wrapper={true}
            />
          </Hidden>
        </Grid>
        <Grid xs={8} item spacing={{ xs: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
            </Grid>
            <Grid item lg={4} md={8} sm={12} xs={12}>
              <FilterPanelHome
                jobList={jobs}
                indexCardActive={indexCardActive}
                jobListHavePages={jobListHavePages}
                onChange={getValuePageAndHandle}
                allRating={allRating}
              />
            </Grid>
            <Grid item lg={6} xs={8} className="onTablet">
              <div className="containerDetailCard containerDetailCard-none">
                <DetailCard
                  logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                  jobDetail={jobDetails}
                  jobList={jobs}
                  candidate={props.candidate}
                  jobListCompany={jobListCompany}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1 }}></Grid>
    </>
  );
};

export default Home;
