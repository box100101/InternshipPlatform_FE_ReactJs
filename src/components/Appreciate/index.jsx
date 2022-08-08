import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ButtonCustom from "../Button";
import "./styles.scss";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import {
  deleteAppreciate,
  getAppreciateByCompany,
  updateAppreciate,
} from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import { toast } from "react-toastify";
import CustomInput from "../CustomInput";
import Textarea from "../Textarea";
import CustomCheckbox from "../CustomCheckbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const labels = {
  0.5: "Vô dụng",
  1: "Vô dụng +",
  1.5: "Kém",
  2: "Kém +",
  2.5: "Được",
  3: "Ok +",
  3.5: "Tốt",
  4: "Tốt +",
  4.5: "Xuất sắc",
  5: "Xuất sắc +",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};
const Appreciate = ({ appreciate }) => {
  const value = appreciate.score;
  const nameUser = "Ẩn danh";
  var checked = false;
  const { profile } = useSelector((state) => state.authentication);

  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(2);
  const [hover, setHover] = useState(-1);
  // const [isCheck, setIsCheck] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { jobDetail } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const idCompany = jobDetail?.hr?.company.id;
  useEffect(() => {
    setValue("title", appreciate.title);
    setValue("comment", appreciate.comment);
    setValue("size-medium", appreciate.score);
    setValue("isCheck", appreciate.hide);
  }, [setValue]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCheck = (e) => {
    const check = e.target.checked;
    checked = check;
  };
  const onSubmit = async (data) => {
    const dataUpdate = {
      id: appreciate.id,
      avaluateData: {
        title: data.title,
        comment: data.comment,
        score: valueRating,
        hide: checked,
      },
    };

    try {
      const res = await dispatch(updateAppreciate(dataUpdate));
      await dispatch(getAppreciateByCompany(idCompany));
      if (res.payload.status === 200) {
        toast.success("Đã đăng đánh giá", {
          // position: "top-center",
          // autoClose: 3000,
        });
      } else {
        toast.error(
          "Có lỗi hoặc bạn đã từng đăng đánh giá, vui lòng kiểm tra lại",
          {
            // position: "top-center",
            // autoClose: 3000,
          }
        );
      }
    } catch (error) {
      if (error.status === 400) {
        for (const key in error.data) {
          setError(key, {
            type: "server",
            message: error.data[key],
          });
        }
      }
    }

    reset();
    setOpen(false);
  };

  const handleDeleteAppreciate = async (e) => {
    e.stopPropagation();
    await dispatch(deleteAppreciate(appreciate.id)).then(
      toast.success("Đã xóa đánh giá thành công")
    );
    await dispatch(getAppreciateByCompany(idCompany));
  };

  return (
    <Box
      sx={{
        width: "100%",
        mb: 1,
        borderRadius: 10,
      }}
    >
      <Stack sx={{}}>
        <Item
          sx={{}}
          className={
            appreciate?.user?.username === profile.username
              ? "appreciate__active"
              : ""
          }
        >
          <div className="appreciate">
            <div className="fix_display">
              <img
                className=""
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
              />
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ fontSize: 16 }}
              >
                {(appreciate.hide === true && nameUser) ||
                  appreciate?.user?.username}
              </Typography>
            </div>

            <div className="fix_display">
              <div
                className=""
                style={{
                  marginTop: "12px",
                  marginRight: "10px",
                }}
              >
                {appreciate?.user?.username === profile.username && (
                  <div className="fix_display">
                    <Tooltip>
                      <Button
                        color="error"
                        onClick={handleDeleteAppreciate}
                        sx={{ fontSize: 12 }}
                        startIcon={<DeleteIcon />}
                      >
                        Xóa
                      </Button>
                    </Tooltip>
                  </div>
                )}
                {appreciate?.user?.username === profile.username && (
                  <div className="fix_display">
                    <Tooltip>
                      <ButtonCustom
                        name="Sửa đánh giá "
                        onClick={handleOpen}
                        bwidth="150px"
                        bheight="40px"
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
              <div>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  sx={{ fontSize: 24 }}
                />
                <Box
                  sx={{ ml: 2, fontSize: 16, transform: "translate(0,13px)" }}
                >
                  {labels[value]}
                </Box>
              </div>
            </div>
          </div>
          <Typography
            variant="p"
            component="div"
            sx={{ fontSize: 16, transform: "translate(0,-10px)" }}
          >
            {`${appreciate?.comment?.slice(
              3,
              appreciate?.comment?.length - 4
            )}` || ""}
            {/* dangerouslySetInnerHTML=
            {{
              __html: appreciate?.comment,
            }} */}
          </Typography>
        </Item>
        <Modal
          modalTitle="Sửa đánh giá về công ty"
          open={open}
          setOpen={setOpen}
          children={
            <div>
              <CustomInput
                label="Sửa tiêu đề hoặc để trống"
                id="title"
                type="text"
                placeholder="Vd. Rất tuyệt"
                register={register}
                requirementField={false}
                setValue={setValue}
                height="50px"
                border="1px solid black"
              />
              <Textarea
                label="Sửa đánh giá về công ty"
                id="comment"
                placeholder="Nhập vào đây"
                register={register}
                defaultValue={appreciate?.comment}
                check={true}
                hover="1.6px solid green"
              >
                {errors.comment?.message}
              </Textarea>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="size-medium"
                  defaultValue={valueRating.toString()}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  sx={{
                    fontSize: "20px",
                    color: "yellow",
                  }}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {valueRating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : valueRating]}
                  </Box>
                )}
              </Box>
              <div onChange={handleCheck}>
                <CustomCheckbox key="1" label="Ẩn danh" />
              </div>
              <ButtonCustom
                onClick={handleSubmit(onSubmit)}
                name="Đăng đánh giá"
              />
            </div>
          }
          name="list-candidate"
        />
      </Stack>
    </Box>
  );
};

Appreciate.propTypes = {};

export default Appreciate;
