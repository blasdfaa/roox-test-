import React from "react";

type Status = "idle" | "loading" | "success" | "error";

const useLoadingStatus = (initialStatus: Status = "idle") => {
  const [status, setStatus] = React.useState<Status>(initialStatus);

  return {
    setLoadingStatus: setStatus,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
};

export default useLoadingStatus;
