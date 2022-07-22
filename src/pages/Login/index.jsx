import React from 'react'
import './styles.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomCheckbox from '../../components/CustomCheckbox'
import CustomInput from '../../components/CustomInput/index'
import Button from '../../components/Button/index'
import { loginUser } from '../../store/slices/main/login/loginSlice'
import { authenticationSelector } from '../../store/selectors/main/loginSelectors'
import { schema } from './data'
import { TabTitle } from 'src/utils/GeneralFunctions'

const Login = () => {
  TabTitle('Login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(authenticationSelector)
  // let loginDirection = ""

  if (status === 'success') {
    const role = JSON.parse(localStorage.getItem('userPresent')).role
    // switch (role) {
    //   case 'Role_HR':
    //     loginDirection = "/hr"
    //     break
    //   case 'Role_Partner':
    //     loginDirection = "/partner"
    //     break
    //   default:
    //     loginDirection = "/candidate"

    // }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const userData = {
      username: data.username,
      password: data.password
    }

    navigate("/hr", { replace: true })
    dispatch(loginUser(userData))
  }

  return (
    <div className="login-form__container">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CustomInput
          label="Tài khoản"
          id="username"
          type="text"
          placeholder="Tài khoản..."
          register={register}
        >
          {errors.username?.message}
        </CustomInput>
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
          visibility={true}
        >
          {errors.password?.message}
        </CustomInput>
        <div className="login-form__save-pass">
          <CustomCheckbox label="Lưu mật khẩu" />
        </div>
        <div className="login-form__btn">
          <Button name="ĐĂNG NHẬP" onClick={handleSubmit(onSubmit)}></Button>
        </div>
      </form>
    </div>
  )
}

export default Login
