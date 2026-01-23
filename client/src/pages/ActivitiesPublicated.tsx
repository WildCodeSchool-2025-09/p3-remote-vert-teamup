import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

function ActivitiesPublicated() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Toaster position="top-center" />
    </>
  );
}

export default ActivitiesPublicated;
