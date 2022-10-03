import { useState, useEffect } from "react";

export const InfiniteScroll = (data) => {
  const LIMIT = 2;
  const totalPost = data.length;
  const [pageNumber, setPageNumber] = useState(1);
  const [observerRef, setObserverRef] = useState(null);
  const limit_data = data.slice(0, pageNumber * LIMIT);
  const moredata = pageNumber < Math.ceil(totalPost / pageNumber);

  useEffect(() => { //loading the page as per the updated data
    const observer = new IntersectionObserver(
      (entries) => {
        if (moredata && entries[0].isIntersecting) {
          setTimeout(() => setPageNumber((prevPage) => prevPage + 1), 3000);
        }
      },
      { threshold: 1 }
    );

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [moredata, observerRef]);

  return {
    limit_data,
    moredata,
    pageNumber,
    setPageNumber,
    observerRef,
    setObserverRef,
  };
};