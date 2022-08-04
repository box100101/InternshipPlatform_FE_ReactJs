import "./styles.scss";
import WorkIcon from "@mui/icons-material/Work";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.scss";
import Button from "../../../components/Button";
import { schema } from "./handleForm";
import SelectCustom from "../../../components/Select";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { getJobPositionList } from "src/store/slices/main/home/job/jobSlice";
import { useNavigate } from "react-router-dom";
import { addDemand, updateDemand, getDemandById } from "src/store/slices/main/home/demand/demandSlice";
import DescriptionForm from "src/components/DescriptionForm";
import { getPartnerByUserID } from "src/store/slices/Admin/university/unversitySlice";
import Textarea from "src/components/Textarea";
import moment from "moment";

const SAMPLEFORM = `Kính chào Quý Cơ quan/ Doanh nghiệp,


Trường .................... vinh dự và tự hào là đối tác tuyển dụng của quý cơ quan, doanh nghiệp.

Nhằm hỗ trợ Quý Cơ quan/ Doanh nghiệp trong công tác thông tin tuyển dụng thực tập, việc làm đến sinh viên/ cựu sinh viên Trường ................... Phía Trung tâm Hướng nghiệp - Tư vấn việc làm của Trường đã đăng tuyển và cung cấp thông tin ứng viên đến Quý đơn vị. Quý Cơ quan/ Doanh nghiệp vui lòng xem thông tin ứng viên bên dưới.


Chúng tôi rất vui mừng trở thành cầu nối hiệu quả với các đối tác nhằm tạo việc làm cho người học và sự hợp tác thành công giữa hai bên.

Trân trọng cảm ơn!`;



const jobTypeList = [
  {
    id: 1,
    name: "Full time",
  },
  {
    id: 2,
    name: "Part time",
  },
  {
    id: 3,
    name: "Remote",
  },
];

const PostPartnerForm = ({idDemand, isUpdate = false }) => {
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  const { status } = useSelector((state) => state.demand);
  const { activeUser } = useSelector((state) => state.university);
  const { demandDetail } = useSelector((state) => state.demand);  
  const [openForm, setOpenForm] = useState(false);
  console.log(demandDetail);

  // console.log(activeUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = JSON.parse(localStorage.getItem("userPresent")).idUser;

  useEffect(() => {
    dispatch(getMajorList());
    dispatch(getJobPositionList());
    dispatch(getDemandById(idDemand))
    dispatch(getPartnerByUserID(idUser));
  }, [idUser]);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleToggle = () => {
    setOpenForm(!openForm);
    console.log("isClicked");
  };
  if (isUpdate) {
    console.log(demandDetail?.desciption);
    setValue("jobName", demandDetail?.name)
    setValue("jobDescription", demandDetail?.desciption)
    setValue("timeStart", demandDetail?.createDate)
    setValue("timeEnd", demandDetail?.end)
    setValue("amount", demandDetail?.amount)
  }

  const onSubmit = (data) => {
    const demandData = {
      demand: JSON.stringify({
        name: data.jobName,
        description: data.jobDescription,
        requirement: "",
        ortherInfo: "",
        startStr: moment(data.timeStart).format("YYYY-MM-DD"),
        endStr: moment(data.timeEnd).format("YYYY-MM-DD"),
        partner: {
          id: parseInt(activeUser?.id),
        },
        major: {
          id: parseInt(data.major),
        },
        position: {
          id: parseInt(data.jobPosition),
        },
        jobType: {
          id: parseInt(data.jobType),
        },
        amount: parseInt(data.amount),
      }),
      fileSV: data.fileSV[0],
    };
  
    console.log(majorList, jobPosition);

    console.log(demandData);

    if(isUpdate) {
      dispatch(updateDemand({ idDemand, demandData }))
    }
    else {
      dispatch(addDemand(demandData));
    }
  };

  if (status === "success") {
    navigate("/partner/post-list");
  }

  return (
    <>
      <div className="partner-post__container">
        <div className="form__container">
          <div className="partner-post__form">
            <div className="partner-post__heading">
              <WorkIcon style={{ margin: "5px 5px 0 0" }} />
              <h2>Đợt thực tập của trường</h2>
            </div>
            <p className="title-requirement">
              (<span className="field-requirment"> * </span>)Trường bắt buộc
            </p>
            <div className="partner-post-title">
              <CustomInput
                label="Tên công việc"
                id="jobName"
                value="test"
                type="text"
                placeholder="Vd. Thực tập thiết kế UI-UX"
                register={register}
              >
                {errors.jobName?.message}
              </CustomInput>
            </div>
            <div className="row-2-col">
              <div className="partner-post__select">
                <SelectCustom
                  id="jobPosition"
                  label="Vị trí công việc"
                  placeholder="Vui lòng chọn"
                  options={jobPosition}
                  register={register}
                >
                  {errors.jobPosition?.message}
                </SelectCustom>
              </div>
              <div className="partner-post__select">
                <SelectCustom
                  id="major"
                  label="Chuyên ngành"
                  placeholder="Vui lòng chọn"
                  options={majorList}
                  register={register}
                >
                  {errors.major?.message}
                </SelectCustom>
              </div>
            </div>
            <div className="row-2-col">
              <div className="partner-post__select">
                <SelectCustom
                  id="jobType"
                  label="Hình thức làm việc"
                  placeholder="Vui lòng chọn"
                  options={jobTypeList}
                  register={register}
                >
                  {errors.jobType?.message}
                </SelectCustom>
              </div>
              <CustomInput
                label="Số lượng ứng viên"
                id="amount"
                type="number"
                placeholder="Nhập số lượng"
                register={register}
              >
                {errors.amount?.message}
              </CustomInput>
            </div>
            <div className="row-2-col">
              <CustomInput
                label="Ngày bắt đầu ứng tuyển"
                id="timeStart"
                type="date"
                placeholder=""
                register={register}
              >
                {errors.timeStart?.message}
              </CustomInput>

              <CustomInput
                label="Ngày hết hạn ứng tuyển"
                id="timeEnd"
                type="date"
                placeholder=""
                register={register}
              >
                {errors.timeEnd?.message}
              </CustomInput>
            </div>
            <div className="partner-post__textarea-description">
              <Textarea
                label="Thư giới thiệu"
                id="jobDescription"
                type="description"
                placeholder="Thư giới thiệu"
                register={register}
                setValue={setValue}
              >
                {errors.jobDescription?.message}
              </Textarea>

              <div className="description-btn-post-partner-container">
                <button
                  className="description-btn-post-partner"
                  onClick={handleToggle}
                >
                  {openForm == false ? "(Xem thư mẫu)" : "(Đóng)"}
                </button>
              </div>
              {openForm && (
                <>
                  <DescriptionForm />
                </>
              )}
            </div>
            <div className="partner-post__textarea">
              <CustomInput
                label="Danh sách sinh viên"
                id="fileSV"
                type="file"
                placeholder=""
                register={register}
              >
                {errors.fileSV?.message}
              </CustomInput>
            </div>
            <div className="partner-post__action">
              <Button onClick={handleSubmit(onSubmit)} 
                name={isUpdate ? "Chỉnh sửa" : "Đăng tuyển"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPartnerForm;
