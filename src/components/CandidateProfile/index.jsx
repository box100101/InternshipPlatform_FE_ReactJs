import React from "react";
import "./styles.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ManIcon from "@mui/icons-material/Man";
import SubjectIcon from "@mui/icons-material/Subject";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "../Button";

const CandidateProfile = () => {
  return (
    <div className="candidate-profile__container">
      <div className="candidate-profile__card-container">
        <div className="candidate-profile__card-info">
          <div className="candidate-profile__card-heading">
            <div className="candidate-profile__card-name">
              <h3 id="candidate-name">Yasuo</h3>
            </div>
            <div className="candidate-profile__card-avatar">
              <div className="candidate-avatar"></div>
            </div>
          </div>
          <div className="candidate-profile__card-detail-info">
            <div className="candidate-profile__card-email">
              <MailOutlineIcon />
              <span className="candidate-info-text">yasuo@gmail.com</span>
            </div>
            <div className="candidate-profile__card-phone">
              <LocalPhoneIcon />
              <span className="candidate-info-text">0293012840</span>
            </div>
            <div className="candidate-profile__card-gender">
              <ManIcon />
              <span className="candidate-info-text">Nam</span>
            </div>
            <div className="candidate-profile__card-major">
              <SubjectIcon />
              <span className="candidate-info-text">Front-end Developer</span>
            </div>
            <div className="candidate-profile__card-auth-btm">
              <Button name="Tài khoản đã xác thực" />
            </div>
          </div>
        </div>
        <div className="candidate-profile__card-footer">

          <button className="candidate-profile__card-update-profile btn-candidate">
            <EditIcon />
            <span className="candidate-profile-footer-text">
              Cập nhật hồ sơ
            </span>
          </button>

          <button className="candidate-profile__card-view-profile btn-candidate">
            <VisibilityIcon />
            <span className="candidate-profile-footer-text">Xem hồ sơ</span>
          </button>

          <button className="candidate-profile__card-download-profile btn-candidate">
            <DownloadIcon />
            <span className="candidate-profile-footer-text">Tải hồ sơ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
