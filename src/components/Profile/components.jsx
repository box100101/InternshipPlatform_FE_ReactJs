import "./styles.scss";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonOutline from "../ButtonOutline";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getProfileByIdUser,
  getUserById,
} from "src/store/slices/Admin/user/userSlice";

export const role = (id) => {
  let role = "";
  switch (id) {
    case 1:
      role = "Nhà tuyển dụng";
      break;
    case 2:
      role = "Quản trị viên";
      break;
    case 3:
      role = "Ứng viên";
      break;
    default:
      role = "Cộng tác viên";
      break;
  }
  return role;
};

export const gender = (id) => {
  let gender = "";
  switch (id) {
    case 0:
      gender = "Nam";
      break;
    case 1:
      gender = "Nữ";
      break;
    default:
      gender = "Khác";
  }
  return gender;
};

export const UserInfor = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.user);
  const idUser = JSON.parse(sessionStorage.getItem("userPresent"))?.idUser;
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    dispatch(getProfileByIdUser(idUser));
    dispatch(getUserById(idUser));
  }, [idUser]);
  return (
    <div className="user-infor__wrapper">
      <div className="profile__avatar">
        <div>
          <img
            className="avatar__img"
            src={
              profile?.user?.avatar
                ? `http://localhost:8085${profile?.user?.avatar}`
                : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            }
            alt="Ảnh đại diện"
          />
        </div>
      </div>
      <div className="profile__infor">
        <h1 className="profile__infor-name">
          {`${profile?.user?.lastName || user?.lastName} ${
            profile?.user?.firstName || user?.firstName
          }`}
          <span className="profile__infor-location">
            <ButtonOutline
              onClick={handleOpen}
              icon={<EditIcon />}
              outline="none"
              color="#111111"
              fz="14px"
              radius="4px"
              padding="0"
            />
          </span>
        </h1>
        <h4 className="profile__infor-username">@{profile?.user?.username}</h4>
        <Divider orientation="horizontal" width="90%" height="2px" />
        <br />
        <div className="profile__infor-item">
          <span>
            <EmailIcon /> Email:
          </span>
          <h3>{profile?.user?.email}</h3>
        </div>
        <div className="profile__infor-item">
          <span>
            <PhoneIcon /> Số điện thoại:
          </span>
          <h3>{profile?.user?.phone}</h3>
        </div>
        <div className="profile__infor-item">
          <span>
            <TransgenderIcon /> Giới tính:
          </span>
          <h3>{gender(profile?.user?.gender)}</h3>
        </div>
        <div className="profile__infor-item">
          <span>
            <PersonIcon /> Vai trò:
          </span>
          <h3>{role(profile?.user?.role?.id)}</h3>
        </div>
      </div>
    </div>
  );
};

export const Actions = () => {
  return (
    <div className="profile__actions">
      <ButtonOutline
        className="profile__actions-item"
        name="Cập nhật CV"
        icon={<SyncAltIcon />}
        outline="1.5px solid #DEDEDE"
        bg="#FFFFFF"
      />
      <ButtonOutline
        className="profile__actions-item"
        name="Xem CV"
        icon={<RemoveRedEyeIcon />}
        outline="1.5px solid #DEDEDE"
        bg="#FFFFFF"
      />
      <ButtonOutline
        className="profile__actions-item"
        name="Tải CV"
        icon={<FileDownloadIcon />}
        outline="1.5px solid #DEDEDE"
        bg="#FFFFFF"
      />
    </div>
  );
};

export const CompanyInfo = () => {
  const { profile } = useSelector((state) => state.user);

  return (
    <div className="company-infor__wrapper">
      {/* <h2 className="company-infor__title">Công ty</h2> */}
      {/* <Divider /> */}
      <div className="company-infor__content">
        <div className="company-infor__col-1">
          <img
            className="company-infor__logo"
            alt="Ảnh của công ty"
            src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
          />
          <p className="company-infor__name">{profile?.company?.name}</p>
        </div>
        <Divider orientation="horizontal" width="100%" height="2px" />
        <br />
        <div className="company-infor__profile">
          <div className="company-infor__row">
            <p className="company-infor__item">
              <span>
                {" "}
                <EmailIcon />
                Email:
              </span>
              {profile?.company?.email}
            </p>
            <p className="company-infor__item">
              <span>
                <PhoneIcon />
                Số điện thoại:
              </span>
              {profile?.company?.phone}
            </p>
          </div>
          <div className="company-infor__row">
            <p className="company-infor__item">
              <span>
                <LanguageIcon />
                Website:
              </span>
              <a
                style={{ textDecoration: "underline", color: "blue" }}
                href={profile?.company?.website}
                target="_blank"
              >
                {profile?.company?.website}
              </a>
            </p>
            <p className="company-infor__item">
              <span>
                <ConfirmationNumberIcon />
                Mã số thuế:
              </span>
              {profile?.company?.tax}
            </p>
          </div>
          <p className="company-infor__des-company">
            <span>Mô tả công ty:</span>
            <br />
            {profile?.company?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const UniversityInfo = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const { user, universityDTO } = profile;
  // console.log(user, universityDTO);

  useEffect(() => {
    const idUser = JSON.parse(sessionStorage.getItem("userPresent")).idUser;
    dispatch(getProfileByIdUser(idUser));
  }, [dispatch]);
  return (
    <div className="company-infor__wrapper">
      <h2 className="company-infor__title">Trường</h2>
      <Divider />
      <div className="company-infor__content">
        <div className="company-infor__col-1">
          <img
            className="company-infor__logo"
            alt="Ảnh của trường"
            src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
          />
          <p className="company-infor__name">{universityDTO?.name}</p>
        </div>
        <div className="company-infor__col-2">
          <div className="company-infor__profile">
            <div className="company-infor__row">
              <p className="company-infor__item">
                <span>Email:</span>
                {universityDTO?.email}
              </p>
              <p className="company-infor__item">
                <span>Số điện thoại:</span>
                {universityDTO?.phone}
              </p>
            </div>
            <div className="company-infor__row">
              <p className="company-infor__item">
                <span>Website:</span>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={universityDTO?.website}
                  target="_blank"
                >
                  {universityDTO?.website}
                </a>
              </p>
              <p className="company-infor__item">
                <span>Tên viết tắc:</span>
                {universityDTO?.shortName}
              </p>
            </div>
            <p className="company-infor__des-company">
              <span>Mô tả về trường:</span>
              <br />
              {universityDTO?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
