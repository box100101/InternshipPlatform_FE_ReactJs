import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Grid, Switch } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import CustomSelect from "../../../components/CustomSelect";
import SelectCustom from "../../../components/Select";
import Button from "../../../components/Button";
import cameraLogo from "../../../assets/img/camera.png";
import { schema, renderControlAction } from "./script.js";
import {
  addCompany,
  getCompanyDetail,
  updateCompanyInfo,
} from "../../../store/slices/Admin/company/companySlice";
import {
  getProviceList,
  getDistrictList,
} from "../../../store/slices/location/locationSlice";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function CompanyForm(props) {
  const { isAdd } = props;

  // get global state from redux store
  const { companyDetail, error } = useSelector((state) => state.company);
  const { provinceList, districtList } = useSelector((state) => state.location);
  console.log(provinceList, districtList);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // local state
  const [image, setImage] = useState(cameraLogo);
  const [imageFile, setImageFile] = useState(null);
  const [isEdit, setIsEdit] = useState(isAdd);

  const fileInput = useRef(null);
  const dispatch = useDispatch();

  // get params from URL
  const { comid } = useParams();
  

  useEffect(() => {
    dispatch(getProviceList());
    // dispatch(getDistrictList(1));
  }, []);

  /**
   * get company details
   * @dependency  comid
   */
  useEffect(() => {
    if (!isAdd) {
      dispatch(getCompanyDetail(comid));
    }
  }, [isAdd]);

  /**
   * @dependency companyDetail
   * isAdd ? "" : companyDetail
   */
  useEffect(() => {
    setValue("name", isAdd ? "" : companyDetail.name);
    setValue("description", isAdd ? "" : companyDetail.description);
    setValue("email", isAdd ? "" : companyDetail.email);
    setValue("phone", isAdd ? "" : companyDetail.phone);
    setValue("tax", isAdd ? "" : companyDetail.tax);
    setValue("website", isAdd ? "" : companyDetail.website);
  }, [companyDetail]);

  // console.log(error);

  // show preview image
  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        console.log(x.target.result);
        setImageFile(imageFile);
        setImage(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // handle Submit form
  const onSubmit = (data) => {
    const companyData = {
      description: data.description,
      email: data.email,
      // logo: image,
      name: data.name,
      phone: data.phone,
      tax: data.tax,
      website: data.website,
    };
    if (isAdd) {
      const addData = { companyData, reset };
      dispatch(addCompany(addData));
    } else {
      // console.log({ ...companyData, id: parseInt(comid) });
      const updateData = {
        companyData: {
          ...companyData,
          id: parseInt(comid),
        },

        setIsEdit,
      };
      console.log(updateData);
      dispatch(updateCompanyInfo(updateData));
    }
  };

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit);
  };

  // handle change district
  // const handleChangeDistrict = (e) => {
  //   console.log(e.target.value);
  //   dispatch(getDistrictList(e.target.value));
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // autoComplete="off"
      className="company-form"
    >
      <div className="company-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="company-form__logo">
              <Avatar
                src={image}
                // variant="rounded"
                alt="company-logo"
                className="company-form__avatar"
                onClick={() => fileInput.current.click()}
              />
              {/* <h3>Company Name</h3> */}
              <input
                id="logo"
                type="file"
                name="logo"
                {...register("logo")}
                onChange={showPreviewImage}
                ref={fileInput}
              />
              <p className="company-form__error">{errors.logo?.message}</p>

              {!isAdd ? (
                <div className="company-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="company-form__block">
                    <p>Khóa tài khoản</p>
                    <Switch {...label} defaultChecked />
                  </div>
                  <button
                    type="button"
                    className="company-form__button-edit"
                    onClick={handleOnClickEdit}
                  >
                    Sửa
                  </button>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={6}>
                <div className="company-form__input">
                  <CustomInput
                    label="Tên công ty"
                    id="name"
                    type="text"
                    placeholder="Tên công ty..."
                    register={register}
                    // defaultValue={companyValue.name}
                    check={!isEdit}
                  >
                    {errors.name?.message}
                    {error?.Name}
                  </CustomInput>
                  <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="email..."
                    register={register}
                    check={!isEdit}
                  >
                    {error?.Email}
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label="Số điện thoại"
                    id="phone"
                    type="tel"
                    placeholder="Số điện thoại..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.phone?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="company-form__input">
                  <CustomInput
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="Website..."
                    register={register}
                    check={!isEdit}
                  >
                    {error?.Website}
                    {errors.website?.message}
                  </CustomInput>
                  <CustomInput
                    label="Mã số thuế"
                    id="tax"
                    type="text"
                    placeholder="Mã số thuế..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.tax?.message}
                  </CustomInput>
                  {/* <CustomSelect
                    name="Tỉnh/Thành phố"
                    label="Tỉnh/Thành phố"
                    dispatch={dispatch}
                    getDistrictList={getDistrictList}
                    selectOptions={provinceList}
                  />
                  <CustomSelect
                    name="Quận/Huyện"
                    label="Quận/Huyện"
                    // dispatch={dispatch}
                    // getDistrictList={getDistrictList}
                    selectOptions={districtList}
                  /> */}
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="company-form__input">
                  <CustomTextarea
                    label="Mô tả công ty"
                    id="description"
                    type="description"
                    placeholder="Mô tả công ty..."
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
        <div className="company-form__submit">
          <Button name="Thêm công ty" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}

      {isEdit & !isAdd ? (
        <div className="company-form__submit">
          <Button name="Cập nhật" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  );
}
