import Profile from "src/components/Profile";
import Password from "src/containers/Home/ChangePasswordForm";
import MainLayout from "src/Layouts/Main";
import CandidateHome from "src/pages/Main/Candidate/Home";
import CandidateInformationCompany from "src/pages/Main/Candidate/InformationCompany";
import CandidateSaveProfile from "src/pages/Main/Candidate/SaveProfile";
import CandidateViewList from "src/pages/Main/Candidate/ViewList";
import DetailHome from "../../pages/Main/DetailHome";

const candidateRouter = [
    {
        path: "/candidate",
        element: <MainLayout />,
        children: [
            {
                path: "",
                Component: CandidateHome,
            },
            {
                path: "view-list-care",
                Component: CandidateViewList,
            },
            {
                path: "save-profile",
                Component: CandidateSaveProfile,
            },
            {
                path: "information_company/:keyword",
                Component: CandidateInformationCompany,
            },
            {
                path: "profile",
                Component: Profile,
            },
            {
                path: "setting",
                Component: Password,
            },
            {
                path: "view-list-apply",
                Component: CandidateViewList,
            },
            {
                path: "detail_job/:keyword",
                Component: DetailHome,
            },
        ]
    }
]

export default candidateRouter