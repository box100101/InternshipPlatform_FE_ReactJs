import "./styles.scss";
import { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import { getListCandidateApplied } from "src/store/slices/main/home/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Null from "src/components/Null";
import PaginationCustome from "src/components/Pagination";

const CandidateList = ({ idJob }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { listCandidatesApplied, totalPages } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    dispatch(getListCandidateApplied([idJob, page, 3]));
  }, [page]);

  const hanldeOnChange = (e, value) => {
    setPage(value);
  };

  return (
    <div className="candidate-list__wrapper">
      {listCandidatesApplied.length ? (
        listCandidatesApplied.map((candidate) => {
          return <CandidateCard candidate={candidate} />;
        })
      ) : (
        <Null
          text="Chưa có ứng viên nào đang ứng tuyển."
          height="100px"
          fs="10px"
          fw="400"
        />
      )}
      <PaginationCustome 
        page={page}
        totalPages={totalPages}
        hanldeOnChange={hanldeOnChange}
      />
    </div>
  );
};

export default CandidateList;
