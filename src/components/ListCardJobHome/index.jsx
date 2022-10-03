import { useState } from "react";
import CardHome from "../CardHome";
import moment from "moment";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import PaginationCustome from "src/components/Pagination";
import RatingJob from "../RatingJob";

const ListCardJobHome = ({
  jobList,
  indexCardActive,
  positionJobValue,
  positionValue,
  onChange,
  jobListHavePages,
  allRating,
  hiddent,
  user
}) => {
 
  const location = useLocation();
  const [page, setPage] = useState(1);
  const handlePagination = (e, valuePage) => {
    setPage(valuePage);
    onChange && onChange(valuePage);
  };
  return (
    <>
      <div className="filter-panel-home__wrapper">
        {jobList && jobList?.length > 0 ? (
          jobList.map((job, index) => (
            <CardHome
              hiddent={hiddent}
              page={page}
              positionValue={positionValue}
              id={job?.jobApp?.id || job?.jobCare?.id || job?.id}
              active={indexCardActive}
              index={index}
              key={job.id}
              title={job.name ? job.name : job.jobApp?.name || job.jobCare?.name}
              fontSize={10}
              nameCompany={
                job?.hr?.company?.name || job?.partner?.universityDTO.name || job?.jobApp?.company?.name || job?.jobApp?.hr?.company?.name || job?.jobCare?.hr?.company?.name
              }
              idCompany={job?.hr?.company?.id || job?.partner?.universityDTO.id || job?.jobApp?.hr?.company?.id}
              tagName={[
                job?.jobposition?.name || job?.position?.name || job?.jobApp?.jobposition?.name || job?.jobCare?.jobposition?.name|| "Không có",
                job?.jobType?.name ||job?.jobApp?.jobType?.name || job?.jobCare?.jobType?.name || "Không có",
              ]}
              location={job.locationjob?.district?.province?.name || job?.universityDTO?.name || job?.jobApp?.locationjob?.district?.province?.name || job?.jobCare?.locationjob?.district?.province?.name}
              amount={job.amount || job.jobApp?.amount || job.jobCare?.amount || "Không có"}
              demandPartner={true}
              time={[
                moment(job.timeStartStr || job.createDate).format("DD/MM/YYYY"),
                moment(job.timeEndStr || job.end).format("DD/MM/YYYY"),
              ]}
              locationPath={location.pathname}
            />
          ))
        ) : (
          <div className="not_found" style={{ textAlignLast: "center" }}>
            Không tìm thấy công việc
          </div>
        )}
      </div>
      {jobListHavePages?.totalPages > 1 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaginationCustome
            page={page}
            totalPages={jobListHavePages?.totalPages}
            handleOnChange={handlePagination}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default ListCardJobHome;