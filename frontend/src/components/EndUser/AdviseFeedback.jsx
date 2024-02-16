import { LoadingSpinner } from "../common/LoadingSpinner";
import { useSelector } from "react-redux";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { TbReportAnalytics } from "react-icons/tb";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const AdviseFeedback = () => {
  const store = useSelector((store) => store.auth);
  const userId = store?.user?.id;
  const navigate = useNavigate();

  const { data, error, loading } = useNetwordCall(
    "get",
    `customer/generate/${userId}`
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-start">
      <div className="mx-5 mt-2">
        <Button callBackFunction={() => navigate("/report")}>
          <div className="flex justify-center items-center">
            <TbReportAnalytics /> Read Report
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AdviseFeedback;
