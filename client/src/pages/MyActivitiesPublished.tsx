import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation } from "react-router";

function MyActivitiesPublished() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast);
    }
  }, [location]);

  return (
    <>
      <Toaster position="top-center" />
    </>
  );
}

export default MyActivitiesPublished;
