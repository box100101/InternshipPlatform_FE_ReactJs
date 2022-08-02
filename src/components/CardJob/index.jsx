import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

import ButtonOutline from "../ButtonOutline";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteMark,
  getMarkByUser,
} from "src/store/slices/main/mark/markSlice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addApply,
  deleteApply,
  getApplyListByIdCandidate,
} from "src/store/slices/main/candidate/apply/applySlice";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
const CardJob = ({ jobCare, jobApplied }) => {
  const { profile } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const handleDeleteJobCare = async (e) => {
    e.stopPropagation();
    await dispatch(deleteMark(jobCare.id)).then(
      toast.success("Đã xóa mark thành công")
    );
    await dispatch(getMarkByUser(profile.username));
  };

  const handleDeleteJobApply = async (e) => {
    e.stopPropagation();
    await dispatch(deleteApply(jobApplied.id)).then(
      toast.success("Đã xóa job thành công")
    );
    dispatch(getApplyListByIdCandidate(profile.idUser));
  };

  const handleAddJob = async (e) => {
    e.stopPropagation();
    const res = await dispatch(getCandidateByUserName(profile.username));
    if (!res.payload.cv) {
      toast.error("Bạn chưa có CV, vui lòng cập nhật");
    } else {
      const applyData = {
        apply: JSON.stringify({
          jobApp: {
            id: jobCare.jobCare.id,
          },
          candidate: {
            id: res.payload.id,
          },
          referenceLetter: `Đơn ứng tuyển ${profile.username}`,
        }),
        fileCV: res.cv,
      };
      const resApply = await dispatch(addApply(applyData));
      console.log(resApply);
      if (resApply.type === "apply_candidate/addApply/fulfilled") {
        toast.success("Đã nộp CV thành công");
      }
    }
  };
  return (
    <div className="card-job__container">
      {jobCare && (
        <>
          <div className="card-job__info">
            <div className="card-job__title">
              <h3 className="card-job__name">{jobCare.jobCare?.name}</h3>
            </div>
            <div className="card-job__content">
              <img
                src="
              https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png
            
            "
                alt="logo-company"
              />
              <div className="card-job__content-detail">
                <h5 className="card-job__company-name">
                  {jobCare.jobCare.hr?.company?.name}
                </h5>
                <div className="card-job__company-work-time">
                  <WorkIcon />
                  <span className="card-job-text">
                    {jobCare.jobCare?.jobType.name}
                  </span>
                </div>
                {/* <div className="card-job__company-salary">
              <PaymentsIcon />
              <span className="card-job-text">
                {" "}
                {formatSalary(jobCare.jobCare?.salaryMin)} -{" "}
                {formatSalary(jobCare.jobCare?.salaryMax)}
              </span>
            </div> */}
                <div className="card-job__company-location">
                  <LocationOnIcon />
                  <span className="card-job-text">
                    {jobCare.jobCare?.locationjob.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-job__detail">
            <div className="card-job__deadline">
              <AccessTimeIcon />
              <span>
                {moment(jobCare.jobCare?.timeStartStr).format("DD/MM/YYYY")} -{" "}
                {moment(jobCare.jobCare?.timeEndStr).format("DD/MM/YYYY")}
              </span>
              <Button
                color="error"
                onClick={handleDeleteJobCare}
                sx={{ fontSize: 12 }}
                startIcon={<DeleteIcon />}
              >
                Xóa
              </Button>
            </div>

            <div className="card-job__send-cv" onClick={handleAddJob}>
              <ButtonOutline name="Nộp CV" />
            </div>
          </div>
        </>
      )}
      {jobApplied && (
        <>
          <div className="card-job__info">
            <div className="card-job__title">
              <h3 className="card-job__name">{jobApplied?.jobApp?.name}</h3>
            </div>
            <div className="card-job__content">
              <img
                src="
              https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png
            
            "
                alt="logo-company"
              />
              <div className="card-job__content-detail">
                <h5 className="card-job__company-name">
                  {jobApplied?.jobApp?.hr?.company?.name}
                </h5>
                <div className="card-job__company-work-time">
                  <WorkIcon />
                  <span className="card-job-text">
                    {jobApplied?.jobApp?.jobType.name}
                  </span>
                </div>
                {/* <div className="card-job__company-salary">
              <PaymentsIcon />
              <span className="card-job-text">
                {" "}
                {formatSalary(jobApp.jobApp?.salaryMin)} -{" "}
                {formatSalary(jobApp.jobApp?.salaryMax)}
              </span>
            </div> */}
                <div className="card-job__company-location">
                  <LocationOnIcon />
                  <span className="card-job-text">
                    {jobApplied.jobApp?.locationjob?.address},
                    {jobApplied.jobApp?.locationjob?.district?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-job__detail">
            <div className="card-job__deadline">
              <AccessTimeIcon />
              <span>
                {moment(jobApplied.jobApp?.timeStartStr).format("DD/MM/YYYY")} -{" "}
                {moment(jobApplied.jobApp?.timeEndStr).format("DD/MM/YYYY")}
              </span>
              <Button
                color="error"
                onClick={handleDeleteJobApply}
                sx={{ fontSize: 12 }}
                startIcon={<DeleteIcon />}
              >
                Xóa
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardJob;
