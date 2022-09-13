import LoginAdminLayout from "src/Layouts/LoginAdmin"
import LoginLayout from "src/Layouts/Login"
import CandidateInfo from "src/pages/Main/HR/CandidateManagement/CandidateInfo"
import HRInfo from "src/pages/Register/RegisterStep3/HRInfo"
import PartnerInfo from "src/pages/Register/RegisterStep3/PartnerInfo"

const loginAdminRouter = [
    {
        path: "/loginadmin",
        element: <LoginAdminLayout />,
        // children: [
        //     {
        //         path: "candidate",
        //         Component: CandidateInfo,
        //     },
        //     {
        //         path: "hr",
        //         Component: HRInfo,
        //     },
        //     {
        //         path: "partner",
        //         Component: PartnerInfo,
        //     },
        // ]
    }
]

export default loginAdminRouter