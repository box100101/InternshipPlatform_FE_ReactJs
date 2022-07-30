import React from "react";
// import PropTypes from "prop-types";
import DetailCard from "../../../components/DetailCard";
import CardVisit from "../../../components/CardVisit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByNameAndLocation } from "../../../store/slices/main/home/job/jobSlice";
function DetailHome(props) {
  const { jobListName, jobDetail } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: 0,
      limit: 10,
    };
    dispatch(getJobByNameAndLocation(dataSearch));
  }, [dispatch]);
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Grid className="wrapper" container spacing={4}>
        <Grid item md={8} sm={12} xs={12}>
          <div className="">
            <DetailCard
              logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
              jobDetail={jobDetail}
              jobListName={jobListName}
            />
            <div className="config__arow-back hide-on-table">
              <Link to="" onClick={handleBack} className="config__arow-back">
                <ArrowBackIcon></ArrowBackIcon>
                Trở lại
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <CardVisit
            logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
            nameCompany="Công Ty R2S "
            emailCompany="tuyendung@r2s.edu.vn"
            phoneCompany="0902394324"
            website="https://r2s.edu.vn/"
            location="1164 đường Phạm Văn Đồng, P.Linh Đông, TP Thủ Đức, TP.HCM"
          />
        </Grid>
        <div className="config__arow-back hide-on-desktop ">
          <Link to="/" className="config__arow-back">
            <ArrowBackIcon></ArrowBackIcon>
            Trở lại
          </Link>
        </div>
      </Grid>
    </div>
  );
}

DetailHome.propTypes = {};

export default DetailHome;
