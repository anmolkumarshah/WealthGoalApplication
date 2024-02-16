import { LoadingSpinner } from "../common/LoadingSpinner";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { useSelector } from "react-redux";
import DisplayText from "../common/DisplayText";
import GoalJourneyCard from "./GoalJourneyCard";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function GoalJourney() {
  useNonAuthRedirect();

  const store = useSelector((store) => store.auth);
  const userId = store?.user?.id;
  const { data, loading, error } = useNetwordCall(
    "get",
    `/customer/goal/${userId}?status=approved`
  );

  if (data == null || loading) {
    return <LoadingSpinner />;
  }

  if (data.length == 0) {
    return <DisplayText>No Journey Started Yet</DisplayText>;
  }

  return (
    <div className="p-4">
      {data.map((el) => (
        <GoalJourneyCard el={el} />
      ))}
    </div>
  );
}

export default GoalJourney;
