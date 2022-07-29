import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonOutline from "../ButtonOutline";
import Modal from "../Modal";
import ProfileForm from "src/containers/Home/ProfileForm";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EditIcon from "@mui/icons-material/Edit";
import NearMeIcon from "@mui/icons-material/NearMe";
import { getProfileByIdUser } from "src/store/slices/Admin/user/userSlice";
import {
  Actions,
  CompanyInfo,
  gender,
  role,
  UniversityInfo,
} from "./components";

const Profile = ({ actions = false }) => {
  const dispatch = useDispatch();
  const { profile, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const idUser = JSON.parse(localStorage.getItem("userPresent"))?.idUser;
  const roleUser = JSON.parse(localStorage.getItem("userPresent"))?.role;

  useEffect(() => {
    dispatch(getProfileByIdUser(idUser));
  }, []);

  let RelatedInfor = "";
  switch (roleUser) {
    case "Role_HR":
      RelatedInfor = <CompanyInfo />;
      break;
    case "Role_Partner":
      RelatedInfor = <UniversityInfo />;
      break;
    case "Role_Candidate":
      RelatedInfor = <Actions />;
      break;
    default:
      RelatedInfor = null;
  }

  console.log("user-info:", profile);
  return (
    <>
      <div className="profile__wrapper">
        <div className="profile__avatar">
          <img
            className="avatar-img"
            src={
              "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            }
            alt="Ảnh đại diện"
          />
          <ButtonOutline
            onClick={handleOpen}
            width="200px"
            bg="#F3F4F6"
            outline="1.5px solid #DEDEDE"
            name="Chỉnh sửa thông tin"
            color="#111111"
            fz="14px"
            radius="4px"
          />
        </div>
        <div className="profile__infor">
          <h1 className="profile__infor-name">
            {`${profile?.user?.lastName} ${profile?.user?.firstName}`}
            <span className="profile__infor-location">
              <NearMeIcon />
            </span>
          </h1>
          <h4 className="profile__infor-username">
            @{profile?.user?.username}
          </h4>
          <div className="profile__infor-item">
            <span>
              <AttachEmailIcon /> Email:
            </span>
            <h3>{profile?.user?.email}</h3>
          </div>
          <div className="profile__infor-item">
            <span>
              <PermPhoneMsgIcon /> Số điện thoại:
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
              <HandshakeIcon /> Vai trò:
            </span>
            <h3>{role(profile?.user?.role?.id)}</h3>
          </div>
          {RelatedInfor}
        </div>
      </div>
      <Modal
          modalTitle="Chỉnh sử thông tin cá nhân"
          children={<ProfileForm onClick={handleClose} />}
          open={open}
          setOpen={setOpen}
          name="profile"
        />
    </>
  );
};

export default Profile;
