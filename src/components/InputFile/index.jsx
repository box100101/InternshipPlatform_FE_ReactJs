import React from "react";
import "./styles.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useEffect } from "react";
import { FileUpload, ImageUpload } from "./components";

const InputFile = ({
  label,
  id,
  format = "not image",
  children,
  register,
  unregister = null,
  check = false,
  defaultValue,
  requirementField = true,
  visibility = false,
  className,
  radius,
  height,
  border,
  icon,
  top,
  setValue,
}) => {
  useEffect(() => {
    if (check) {
      unregister(id);
    }
  }, [check, id, unregister]);

  let accept;
  let text;
  switch (format) {
    case "image":
      accept = ".png, .jpg";
      text = "Chỉ hỗ trợ file .JPG, .PNG. Kích thước tối đa 512KB."
      break;
    case "doc":
      accept = ".docx";
      text="Chỉ hỗ trợ file .DOCX."
      break;
    case "pdf":
      accept = ".pdf";
      text="Chỉ hỗ trợ file .PDF."
      break;
    case "excel":
      accept = ".xlsx";
      break;
    default: // all of file (except image)
      accept = ".docx, .pdf, .xlsx";
      text="Chỉ hỗ trợ file .DOCX, .PDF, .XLSX."
  }

  const [isHide, setIsHide] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [fileName, setFileName] = useState("");
  const handleHide = () => {
    setIsHide(!isHide);
  };

  const handlePreviewFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImgSrc(x.target.result);
      };
      reader.readAsDataURL(imgFile);
      setValue(id, imgFile);
      setFileName(imgFile.name);
    }
  };

  let component;
  switch (format) {
    case "image":
      component = <ImageUpload text={text} img={imgSrc} />;
      break;
    default: //word or pdf or excel
      component = <FileUpload text={text} format={format} fileName={fileName} />;
  }

  return (
    <div className={`custom-input ${className ? className : ""} `}>
      <label htmlFor={id} className="custom-input__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
        {component}
      </label>
      {check ? null : <p className="custom-input__error">{children}</p>}
      <div
        className={` ${"file-input"}
          ${
            check
              ? "custom-input__textfield-disabled"
              : "custom-input__textfield"
          }
          
        `}
      >
        {icon}
        <input
          style={{
            borderRadius: radius ? radius : "",
            height: height ? height : "",
            border: border ? border : "",
          }}
          type="file"
          id={id}
          disabled={check}
          {...register(id)}
          onChange={handlePreviewFile}
          accept={accept}
        />
        {visibility && (
          <div
            className="visibility-icon"
            onClick={handleHide}
            style={{ cursor: "pointer", top: `${top}` }}
          >
            {isHide ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFile;
