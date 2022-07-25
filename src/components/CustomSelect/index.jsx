import React from 'react'
import './styles.scss'

const CustomSelect = React.forwardRef(
  (
    {
      onBlur,
      register,
      name,
      label,
      selectOptions,
      getDistrictList,
      dispatch = () => {},
      id,
      children
    },
    ref
  ) => {
    // render option
    const renderSelectOption = () => {
      if (selectOptions) {
        return selectOptions.map(item => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          )
        })
      }
    }

    // handle change district
    const handleChangeDistrict = e => {
      // console.log(e.target.value);
      dispatch(getDistrictList(e.target.value))
    }

    const handleChange = e => {}

    return (
      <>
        <label>{label}</label>
        <div className="custom-select__textfield">
          <select
            name={name}
            ref={ref}
            onChange={handleChange || handleChangeDistrict}
            onBlur={onBlur}
            id={id}
            className="select__item"
          >
            <option value="">Vui lòng chọn</option>
            {renderSelectOption()}
          </select>
          <p className="custom-input__error">{children}</p>
        </div>
      </>
    )
  }
)

export default CustomSelect
