import { LoadingSpinner } from "../common/LoadingSpinner";
import AllInstallment from "../Plan/AllInstallment";
import { useEffect, useState } from "react";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

// for journey : boolean is for user only when they are pay investments
function JourneyList({ goalId }) {
  useNonAuthRedirect();
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/goal/selected-plan-installment/${goalId}`
      );
      if (allData.status === 200) {
        setdata(allData.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data == null) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" md:ml-2 bg-slate-100 rounded-md border-2 w-100 md:w-3/4 overflow-x-scroll p-1">
      <AllInstallment data={data} forJourney={true} callback={fetchData} />
    </div>
  );
}

export default JourneyList;
