import React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Rating from "@mui/material/Rating";
import { Icon } from "@mui/material";
import moment from "moment";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import { toast } from "react-toastify";
import { addApply } from "src/store/slices/main/candidate/apply/applySlice";
// const formatSalary = (salary = "") => {
//   return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

const InformationCompany = ({ jobDetail }) => {
  const { profile } = useSelector((state) => state.authentication);
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  const dispatch = useDispatch();

  const handleAddJob = async (e) => {
    e.stopPropagation();
    await dispatch(getCandidateByUserName(profile.username));
    if (!candidateInfoByUsername.cv) {
      toast.error("Bạn chưa có CV, vui lòng cập nhật");
    } else {
      const applyData = {
        apply: JSON.stringify({
          jobApp: {
            id: jobDetail.id,
          },
          candidate: {
            id: profile.idUser,
          },
          referenceLetter: `Đơn ứng tuyển ${profile.username}`,
        }),
        fileCV: candidateInfoByUsername.cv,
      };
      await dispatch(addApply(applyData)).then(toast.success("Đã nộp CV"));
    }

    // await dispatch(getMarkByUser(profile.username));
  };
  return (
    <div>
      <div className="detail__card-3">
        <Typography variant="span">
          <Typography
            variant="span"
            sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
          >
            Mô tả công việc:
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ fontSize: 17, fontWeight: "400" }}
          >
            {jobDetail.desciption}
          </Typography>
        </Typography>
        <div className="detail__card-3-item">
          <Typography variant="span">
            <Typography variant="span" sx={{ fontSize: 16, fontWeight: "700" }}>
              Yêu cầu công việc:
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontSize: 17, fontWeight: "400" }}
            >
              {jobDetail.requirement}
            </Typography>
          </Typography>
        </div>
        <div className="detail__card-3-item">
          <Typography variant="span">
            <Typography variant="span" sx={{ fontSize: 16, fontWeight: "700" }}>
              Thời hạn ứng tuyển:
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontSize: 17, fontWeight: "400" }}
            >
              {moment(jobDetail.timeStartStr).format("DD/MM/YYYY")} -{" "}
              {moment(jobDetail.timeEndStr).format("DD/MM/YYYY")}
            </Typography>
          </Typography>
        </div>
      </div>
      <div className="line"></div>
      <div className="detail__card-4">
        {/* <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <CurrencyExchangeIcon />
          </Icon>
          <Typography variant="h6" gutterBottom component="div" >
            {formatSalary(jobDetail.salaryMin)} -{" "}
            {formatSalary(jobDetail.salaryMax)}
          </Typography>
        </div> */}
        <div className="detail__card-4-item" sx={{ display: "flex" }}>
          <Icon className="detail__card-4-item-icon">
            <WorkIcon />
          </Icon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 17,
              fontWeight: "400",
              transform: "translate(5px,5px)",
            }}
          >
            {jobDetail.jobType?.name}
          </Typography>
        </div>
        <div className="detail__card-4-item">
          <AddLocationIcon className="detail__card-4-item-icon">
            <WorkIcon />
          </AddLocationIcon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 17,
              fontWeight: "400",
              transform: "translate(5px,5px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {`${jobDetail.locationjob?.address}, ${jobDetail.locationjob?.district?.name}, ${jobDetail.locationjob?.district?.province?.name}`}
          </Typography>
        </div>
      </div>
      <div className="detail__card-5">
        <Typography variant="span" gutterBottom component="div">
          <Typography variant="button" display="block" gutterBottom>
            {jobDetail.company?.rates?.length}
          </Typography>
          <Rating
            name="read-only"
            precision={0.5}
            readOnly
            defaultValue={jobDetail.company?.rates?.length}
          />
          <Button name="Ứng tuyển" onClick={handleAddJob}></Button>
        </Typography>
      </div>
    </div>
  );
};

InformationCompany.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InformationCompany;
