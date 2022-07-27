import moment from "moment";
import * as yup from "yup";

// yup validate form post job form
const date = moment(Date.now()).format("DD/MM/YYYY").toString();
export const schema = yup
  .object({
    name: yup.string().required(" * Bạn phải điền chức danh."),
    jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
    major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
    jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
    amount: yup
      .number()
      .required(" * Bạn phải nhập số ứng viên cần tuyển.")
      .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
      .min(1, " * Số lượng ứng viên phải lơn hơn 0."),
    timeStart: yup
      .date()
      .min(
        `01-01-2022`,
        ` * Bạn phải chọn ngày bắt đầu tuyển và sau 01-01-2022`
      )
      .required(),
    timeEnd: yup
      .date()
      .min(yup.ref("timeStart"), "Ngày hết hạn phải lớn hơn ngày bắt đầu")
      .required(),
    district: yup.string().required(" * Bạn phải chọn quận/huyện."),
    province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
    country: yup.string().required(" * Bạn phải chọn quốc gia."),
    address: yup.string().required(" * Bạn phải nhập chi tiết địa chỉ."),
    jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
    salaryMin: yup
      .number()
      .required(" * Bạn phải nhập mức lương tối thiểu.")
      .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
      .min(1000, " * Số tiền trợ cấp phải lớn hơn 1000."),
    salaryMax: yup
      .number()
      .required(" * Bạn phải nhập mức lương tối đa.")
      .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
      .min(1000, " * Số tiền trợ cấp phải lớn hơn 1000."),
  })
  .required();
