import React, {
  useState,
  // useRef,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Grid, Switch } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import Button from "../../../components/Button";
import cameraLogo from "../../../assets/img/camera.png";
import { schema, renderControlAction } from "./script.js";
import {
  addUniversity,
  getUniversityDetail,
  updateUniversityInfo,
} from "../../../store/slices/Admin/university/unversitySlice";
import MultiSelect from "../../../components/MultiSelect";

const label = { inputProps: { "aria-label": "Switch demo" } };
const baseURL = process.env.REACT_APP_API;

export default function UniversityForm(props) {
  const { isAdd } = props;

  const { universityDetail } = useSelector((state) => state.university);

  const [image, setImage] = useState(cameraLogo);
  const [isEdit, setIsEdit] = useState(isAdd);

  // const fileInput = useRef(null)
  const dispatch = useDispatch();

  // get params from URL
  const { uniId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * get company details
   */
  useEffect(() => {
    if (!isAdd) {
      setImage(cameraLogo);
      dispatch(getUniversityDetail(uniId));
    }
  }, [isAdd, dispatch]);

  /**
   * @dependency universityDetail
   * isAdd ? "" : universityDetail
   */
  useEffect(() => {
    if (universityDetail) {
      if (!isAdd) {
        setImage(`${baseURL}${universityDetail.avatar}`);
      }
      // setValue("logo", isAdd ? "" : universityDetail.avatar);
      setValue("name", isAdd ? "" : universityDetail.name);
      setValue("description", isAdd ? "" : universityDetail.description);
      setValue("email", isAdd ? "" : universityDetail.email);
      setValue("phone", isAdd ? "" : universityDetail.phone);
      setValue("shortName", isAdd ? "" : universityDetail.shortName);
      setValue("website", isAdd ? "" : universityDetail.website);
    }
  }, [universityDetail, isAdd]);

  // show preview image
  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImage(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // handle Submit form
  const onSubmit = (data) => {
    const universityData = {
      file: data.logo[0],
      university: JSON.stringify({
        description: data.description,
        email: data.email,
        // logo: null,
        name: data.name,
        phone: data.phone,
        shortName: data.shortName,
        website: data.website,
      }),
    };

    if (isAdd) {
      dispatch(
        addUniversity({
          universityData,
          reset: reset({
            description: "",
            email: "",
            logo: "",
            name: "",
            phone: "",
            shortName: "",
            website: "",
          }),
          setImage: setImage(cameraLogo),
        })
      );
    } else {
      const updateData = {
        universityData,
        uniId,
      };
      dispatch(updateUniversityInfo(updateData));
    }
  };

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="university-form"
      encType="multipart/form-data"
    >
      <div className="university-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="university-form__logo">
              <Avatar
                src={image}
                alt="university-logo"
                className="university-form__avatar"
              />
              <input
                id="logo"
                type="file"
                name="logo"
                {...register("logo")}
                onChange={showPreviewImage}
              />
              <p className="university-form__error">{errors.logo?.message}</p>

              {!isAdd ? (
                <div className="university-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="university-form__block">
                    <p>Kh??a t??i kho???n</p>
                    <Switch {...label} defaultChecked />
                  </div>
                  <button
                    type="button"
                    onClick={handleOnClickEdit}
                    className="university-form__button-edit"
                  >
                    S???a
                  </button>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={6}>
                <div className="university-form__input">
                  <CustomInput
                    label="T??n tr?????ng"
                    id="name"
                    type="text"
                    placeholder="T??n tr?????ng..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.name?.message}
                  </CustomInput>
                  <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="abc.xyz@gmail.co..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label="S??? ??i???n tho???i"
                    id="phone"
                    type="tel"
                    placeholder="S??? ??i???n tho???i..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.phone?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="university-form__input">
                  <CustomInput
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="Website..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.website?.message}
                  </CustomInput>
                  <CustomInput
                    label="T??n vi???t t???t"
                    id="shortName"
                    type="text"
                    placeholder="UTE..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.tax?.message}
                  </CustomInput>
                  <MultiSelect />
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="university-form__input">
                  <CustomTextarea
                    label="M?? t??? tr?????ng"
                    id="description"
                    type="description"
                    placeholder="M?? t??? tr?????ng..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.description?.message}
                  </CustomTextarea>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {isAdd ? (
        <div className="university-form__submit">
          <Button name="Th??m tr?????ng" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}

      {isEdit & !isAdd ? (
        <div className="university-form__submit">
          <Button name="C???p nh???t" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  );
}
