import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import Button from "../../../components/Button";
import { schemaMajor, renderControlAction } from "./script.js";
import {
  addMajor,
  getMajorDetail,
  updateMajorInfo,
} from "../../../store/slices/Admin/major/majorSlice";

// const label = { inputProps: { "aria-label": "Switch demo" } };

export default function MajorForm({ isAdd, setOpen }) {
  const { majorDetail } = useSelector((state) => state.major);
  const [isEdit, setIsEdit] = useState(isAdd);
  const [nameMajor, setNameMajor] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schemaMajor),
  });

  const onSubmit = (data) => {
    const majorData = {
      name: data.name,
    };
    if (isAdd) {
      dispatch(addMajor(majorData));
      setOpen(false);
    } else {
      const updateData = {
        majorData: {
          ...majorData,
          id: parseInt(location.pathname.slice(13)),
        },

        setIsEdit,
      };
      dispatch(updateMajorInfo(updateData));
    }
  };

  /**
   * get major details
   */
  useEffect(() => {
    if (!isAdd) {
      dispatch(getMajorDetail(location.pathname.slice(7)));
    }
  }, [isAdd]);

  /**
   * @dependency universityDetail
   * isAdd ? "" : universityDetail
   */
  useEffect(() => {
    if (majorDetail) {
      setValue("name", isAdd ? "" : majorDetail.name);
    }
  }, [majorDetail]);

  // handle Submit form

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="major-form"
    >
      <div className="major-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="major-form__logo">
              {/* <h3>major Name</h3> */}
              {!isAdd ? (
                <div className="major-form__control">
                  <ul>{renderControlAction()}</ul>
                  <button
                    type="button"
                    onClick={handleOnClickEdit}
                    className="major-form__button-edit"
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
                    label="T??n Major"
                    id="name"
                    type="text"
                    placeholder="T??n major..."
                    register={register}
                    defaultValue="name"
                    values={nameMajor}
                    check={!isEdit}
                  >
                    {errors.name?.message}
                  </CustomInput>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {isAdd ? (
        <div className="university-form__submit">
          <Button name="Th??m Major" onClick={handleSubmit(onSubmit)} />
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
