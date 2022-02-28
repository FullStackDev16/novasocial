import React from "react";
import { useSelector } from "react-redux";
import Info from "../../components/profile/Info";
import SmallLoading from "../../components/smallComponents/SmallLoading";

const Profile = () => {
  const { profile } = useSelector((state) => state);

  return (
    <>
      {profile.loading ? <SmallLoading/> : <Info />}
    </>
  );
};

export default Profile;
