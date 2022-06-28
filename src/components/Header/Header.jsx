import React from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'
import Button from '../Button'
import Logo from '../Logo';
import "./styles.scss";

function Header(props) {
  return (
    <div className="container">
      <Logo/>
      <div className="login__home">
        <Link to="/login" className="login">
          <h5>Đăng Nhập</h5>
        </Link>
        <Button name="Đăng Ký" />
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
