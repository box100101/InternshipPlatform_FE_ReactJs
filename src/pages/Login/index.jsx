import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TabTitle } from "src/utils/GeneralFunctions";
import Button from "../../components/Button/index";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomInput from "../../components/CustomInput/index";
import { loginUser } from "../../store/slices/main/login/loginSlice";
import "./styles.scss";
import { schema } from "./validate";

const Login = () => {
  TabTitle("Login");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(
    localStorage.getItem("saveLogin") ? true : false
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isCheck) {
      setValue(
        "username",
        JSON.parse(localStorage.getItem("saveLogin")).username
      );
      setValue(
        "password",
        JSON.parse(localStorage.getItem("saveLogin")).password
      );
    }
  }, []);

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await dispatch(loginUser(userData));
      if (res.payload.token) {
        const role = res.payload.role;
        switch (role) {
          case "Role_Partner":
            navigate(`/partner`, { replace: true });
            break;
          case "Role_HR":
            navigate(`/hr`, { replace: true });
            break;
          case "Role_Candidate":
            navigate(`/candidate`, { replace: true });
            break;
          default:
        }
      }
    } catch (error) {
      toast.error(error);
    }
    if (isCheck) {
      const loginInfor = {
        username: data.username,
        password: data.password,
      };
      localStorage.setItem("saveLogin", JSON.stringify(loginInfor));
    } else {
      localStorage.removeItem("saveLogin");
    }
  };
  const handleSaveLogin = (e) => {
    setIsCheck(!isCheck);
  };

  return (
    <div className="login-form__container">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CustomInput
          label="T??i kho???n"
          id="username"
          type="text"
          placeholder="T??i kho???n..."
          setValue={setValue}
          register={register}
          requirementField={false}
        >
          {errors.username?.message}
        </CustomInput>
        <CustomInput
          label="M???t kh???u"
          id="password"
          type="password"
          placeholder="M???t kh???u..."
          setValue={setValue}
          register={register}
          visibility={true}
          requirementField={false}
        >
          {errors.password?.message}
        </CustomInput>
        <div className="login-form__save-pass" onChange={handleSaveLogin}>
          <CustomCheckbox checked={isCheck} label="L??u ????ng nh???p" />
        </div>
        <div className="login-form__btn">
          <Button name="????NG NH???P" onClick={handleSubmit(onSubmit)}></Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
