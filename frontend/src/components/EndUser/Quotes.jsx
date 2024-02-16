import React, { useEffect, useState } from "react";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Quote } from "@radix-ui/themes";

function Quotes() {
  const { data, error, loading } = useNetwordCall("get", "customer/quotes");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change quote every 5 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Object.keys(data).length
      );
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading quotes</div>;
  }

  const authors = Object.keys(data);
  const currentAuthor = authors[currentIndex];

  return (
    <div className="w-100 mx-5 mt-2 p-4 border rounded-lg shadow-lg bg-white min-h-[10%] max-h-[18%]">
      <div className="text-xl mb-1 font-thin text-center font-sans">
        <Quote>{data[currentAuthor]} </Quote>
      </div>
      <div className="text-lg font-semibold mb-2 text-center">
        by {currentAuthor}
      </div>
    </div>
  );
}

export default Quotes;
