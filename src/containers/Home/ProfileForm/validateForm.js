import * as yup from "yup";

export const genderList = [
  {
    id: 0,
    name: "Nam",
  },
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Khác",
  },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object({
  avatar: yup
    .mixed()
    .test(
      "fileSize",
      " * Ảnh bạn chọn quá lớn. Kích thước tối đa là 512Kb.",
      (value) => {
        return value && value[0].size <= 512 * 1024;
      }
    )
    .test("type", " * Chỉ hỗ trợ jpeg, png.", (value) => {
      return (
        value &&
        (value[0].type === "image/jpeg" || value[0].type === "image/png")
      );
    }),
  lastName: yup.string().required(" * Họ của bạn không được để trống."),
  firstName: yup.string().required(" * Tên của bạn không được để trống."),
  phone: yup
    .string()
    .required(" * Số điện thoại của bạn không được để trống.")
    .matches(phoneRegExp, " * Số điện thoại không đúng."),
  gender: yup.string().required(),
});
