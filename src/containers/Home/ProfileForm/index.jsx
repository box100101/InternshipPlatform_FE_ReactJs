import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import CustomInput from "src/components/CustomInput";
import InputFile from "src/components/InputFile";
import SelectCustom from "src/components/Select";
import { updateUser } from "src/store/slices/Admin/user/userSlice";
import "./styles.scss";
import { genderList, schema } from "./validateForm";

const ProfileForm = ({ profile }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const userSessionStorage = JSON.parse(sessionStorage.getItem("userPresent"));

  useEffect(() => {
    setValue(
      "firstName",
      profile?.user?.firstName || profile?.userDTO?.firstName
    );
    setValue("lastName", profile?.user?.lastName || profile?.userDTO?.lastName);
    setValue("email", profile?.user?.email || profile?.userDTO?.email);
    setValue("phone", profile?.user?.phone || profile?.userDTO?.phone);
    setValue("gender", profile?.user?.gender);
  }, [profile, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    const profileData = {
      hr: JSON.stringify({
        user: {
          username: profile?.user?.username,
          gender: parseInt(data.gender),
          phone: data.phone,
          email: profile?.user?.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: profile?.user?.role,
        },
        position: profile.position,
        company: { id: profile.company?.id },
      }),
      fileAvatar: data.avatar,
    };
    dispatch(updateUser([profile.id, userSessionStorage.token, profileData]));
  };


  return (
    <>
      <form className="profile-form__wrapper" autoComplete="off">
        <Typography variant="button">Thay ?????i th??ng tin</Typography>
        <div className="profile-form__content">
          <p className="title-requirement">
            (<span className="field-requirment"> * </span>)Tr?????ng b???t bu???c
          </p>
          <div className="profile-form__content-item">
            <InputFile
              label="???nh ?????i di???n"
              requirementField={false}
              id="avatar"
              format="image"
              radius="2px"
              setValue={setValue}
              register={register}
              imageCurrent={profile.user?.avatar}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              setValue={setValue}
              id="lastName"
              label="H???"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.lastName?.message}
            </CustomInput>
            <CustomInput
              register={register}
              setValue={setValue}
              id="firstName"
              label="T??n"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.firstName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <SelectCustom
              setValue={setValue}
              id="gender"
              register={register}
              label="Gi???i t??nh"
              defaultValue={profile?.user?.gender}
              options={genderList}
              placeholder="Vui l??ng ch???n"
            >
              {errors.gender?.message}
            </SelectCustom>
            <CustomInput
              register={register}
              setValue={setValue}
              id="phone"
              type="text"
              label="S??? ??i???n tho???i"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.phone?.message}
            </CustomInput>
          </div>
        </div>
        <div className="profile-form__action">
          <Button
            name="L??u"
            onClick={handleSubmit(onSubmit)}
            fz="14px"
            outline="1.5px solid #DEDEDE"
            className="profile-form__action-btn"
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
