import { Grid, Hidden } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import {
  indexFilterChange,
  jobFilters,
} from "src/store/slices/main/home/filter/filterSlices";
import { getAllRating } from "src/store/slices/main/home/rating/rating";
import DetailCard from "../../../components/DetailCard";
import ListCardJobHome from "../../../components/ListCardJobHome";
import SearchResultHome from "../../../components/SearchResultHome";
import SideBarHomeList from "../../../components/SideBarHomeList";
import { getJobPositionList } from "../../../store/slices/main/home/job/jobSlice";
import "./styles.scss";

const initialState = {
  type: [],
  position: [],
  major: [],
  no: 0,
  order: "oldest",
  name: "",
  province: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "no":
      return { ...state, no: action.payload };
    case "province":
      return { ...state, province: action.payload };
    case "type":
      return { ...state, type: action.payload };
    case "position":
      return { ...state, position: action.payload };
    case "major":
      return { ...state, major: action.payload };
    case "reset": {
      return {
        ...state,
        type: [],
        position: [],
        major: [],
        no: 0,
        order: "oldest",
        name: "",
        province: "",
      };
    }
    default:
      return { ...state };
  }
}

const Home = (props) => {
  const { index, jobFilter, jobPage } = useSelector((state) => state.filter);
  const { allRating } = useSelector((state) => state.rating);
  const { jobPosition } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const [state, dispatcher] = useReducer(reducer, initialState);

  const listPositionWorkingFormat = jobPosition.map((item) => {
    return item.name;
  });
  const [valueLocation, setValueLocation] = useState("");
  const [jobs, setJob] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);

  const listWorkingFormat = [
    { name: "Fulltime", id: 1 },
    { name: "Parttime", id: 2 },
    { name: "Remote", id: 3 },
  ];

  const handleSearch = (value) => {
    dispatch(indexFilterChange(0));
    dispatcher({ type: "name", payload: value });
    dispatcher({ type: "no", payload: 0 });
    dispatcher({ type: "province", payload: valueLocation });
  };
  const getValueLocationAndHandle = (value) => {
    setValueLocation(value);
  };
  const getValuePageAndHandle = (value) => {
    dispatcher({ type: "no", payload: value - 1 });
    dispatch(indexFilterChange(0));
    window.scroll(0, 0);
  };
  const handleCheck = (value) => {
    dispatch(indexFilterChange(0));
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];
    if (value.length > 0) {
      tempType = value.filter((sp) =>
        listWorkingFormat
          .map((items) => {
            return items.name;
          })
          .includes(sp)
      );
      tempPosition = value.filter((items) =>
        listPositionWorkingFormat
          .map((item) => {
            return item;
          })
          .includes(items)
      );
      tempMajor = value.filter(
        (items) =>
          !listPositionWorkingFormat
            .map((item) => {
              return item;
            })
            .includes(items) &&
          !listWorkingFormat
            .map((item) => {
              return item.name;
            })
            .includes(items)
      );
      dispatcher({ type: "type", payload: tempType });
      dispatcher({ type: "position", payload: tempPosition });
      dispatcher({ type: "major", payload: tempMajor });
      dispatcher({ type: "no", payload: 0 });
    }
  };

  useEffect(() => {
    dispatch(indexFilterChange(0));
    dispatch(getMajorList([1, 20]));
    dispatch(getJobPositionList());
    dispatch(getAllRating([0, 5]));
  }, [dispatch]);
  useEffect(() => {
    const dataFilter = {
      type: state.type + "",
      order: state.order,
      position: state.position + "",
      name: state.name,
      province: state.province,
      major: state.major + "",
      no: state.no,
      limit: 5,
    };
    dispatch(jobFilters(dataFilter));
  }, [state, dispatch]);
  useEffect(() => {
    setJob(jobFilter);
    setJobDetail(jobFilter[index]);
  }, [jobFilter, dispatch, index]);
  return (
    <>
      <Grid
        className="wrapper"
        sx={{ padding: "8px" }}
        spacing={{ xs: 1 }}
        container
      >
        <Grid item xs={2}>
          <Hidden mdDown>
            <SideBarHomeList
              onChange={handleCheck}
              slideBarHome__wrapper={true}
            />
          </Hidden>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={{ xs: 1 }}>
            <Grid item xs={12}>
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <ListCardJobHome
                jobList={jobs}
                indexCardActive={index}
                jobListHavePages={jobPage}
                onChange={getValuePageAndHandle}
                allRating={allRating}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className="containerDetailCard containerDetailCard-none">
            <DetailCard
              logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
              jobDetail={jobDetail}
              jobList={jobs}
              candidate={props.candidate}
              jobListCompany={jobs}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
