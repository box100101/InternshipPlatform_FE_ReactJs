import React from 'react'
import RegisterContainer from "../../pages/Register/RegisterContainer/index"
import './styles.scss'
import { Outlet } from "react-router-dom"

export default function RegisterLayout() {
  return (
    <div className="register-layout">
      <RegisterContainer/>
    </div>
  )
}
