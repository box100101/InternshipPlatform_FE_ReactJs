import React from 'react';

import './candidate-info.scss'

import ArrowButton from "../../../../components/ArrowButton/ArrowButton";
import Button from "../../../../components/Button";
import CustomInput from '../../../../components/CustomInput/index'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from 'react-router-dom'
import { registerUser } from "../../../../store/actions/user.action";
import { useDispatch } from "react-redux";

import { majorList, schema } from "./data";

const CandidateInfo = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBackClick = (e) => {
        e.preventDefault();
        navigate(-1)
    }
    const onSubmit = (data) => {
        const step2Data = JSON.parse(sessionStorage.getItem("account"))
        const userData= {
            major: {
                id: parseInt(data.major)
            },
            CV: data.cv,
            createUser: {
                username: step2Data.username,
                password: step2Data.password,
                confirmPassword: step2Data.confirmPassword,
                gender: parseInt(data.gender),
                lastName: data.lastname,
                firstName: data.firstname,
                phone: data.phone,
                email: step2Data.email,
                role: {
                    id: parseInt(step2Data.role.id)
                }
            }
        }
        
        console.log(userData)
        dispatch(registerUser(userData, navigate))
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    return (
        <div className="reg-candidate">
            <form className="reg-candidate__form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="reg-candidate__form--name">
                    <CustomInput
                        label="Họ"
                        id="lastname"
                        type="text"
                        placeholder="Họ..."
                        register={register}
                    >
                        {errors.lastname?.message}
                    </CustomInput>
                    
                    <CustomInput
                        label="Tên"
                        id="firstname"
                        type="text"
                        placeholder="Tên..."
                        register={register}
                    >
                        {errors.firstname?.message}
                    </CustomInput>
                </div>

                <CustomInput
                        label="Số điện thoại"
                        id="phone"
                        type="phone"
                        placeholder="Số điện thoại"
                        register={register}
                    >
                        {errors.phone?.message}
                </CustomInput>
                
                <label className="reg-candidate__form--label" htmlFor="gender">Giới tính</label>
                <select {...register("gender")} id="gender" className="reg-candidate__form--select">
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                    <option value="2">LGBT</option>
                </select>

                <label className="reg-candidate__form--label" htmlFor="gender">Chuyên ngành</label>
                <select {...register("major")} id="major" className="reg-candidate__form--select">
                    {
                        majorList.map((major) => <option value={major.id} key={major.id}>{major.name}</option>)
                    }
                </select>

                <CustomInput
                    label="Avatar"
                    id="avatar"
                    type="file"
                    register={register}
                    check={true}
                >
                        {errors.avatar?.message}
                </CustomInput>

                <CustomInput
                    label="CV"
                    id="cv"
                    type="file"
                    register={register}
                    check={true}
                >
                        {errors.cv?.message}
                </CustomInput>

                <div className="reg-candidate__btns">
                    <div className="reg-candidate__btns--item" onClick={handleBackClick}>
                        <ArrowButton text="Trở lại" direction="left" />
                    </div>
                    <div className="reg-candidate__btns--item">
                        <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CandidateInfo;
