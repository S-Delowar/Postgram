import React from "react";
import Layout from "../components/Layout";
import { Navigate, useParams } from "react-router-dom";
import { useLoggedInUserSWR, useUserSWR } from "../helper/getUser";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";

const UpdateProfile = () => {
  const { userId } = useParams();

  console.log("profile id: ", userId);
  const { user: profileUser, isLoading: isLoadingProfileUser, mutate: mutateProfileUser } = useUserSWR(userId);
  const { loggedInUser, isLoading: isLoadingLoggedUser } = useLoggedInUserSWR();


  if (isLoadingProfileUser || isLoadingLoggedUser) {
    return <p>Loading...</p>;
  }

  if (loggedInUser.username !== profileUser.username) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <h3>Update your profile</h3>
      <UpdateProfileForm profileUser={profileUser} refresh={mutateProfileUser} />
    </Layout>
  );
};

export default UpdateProfile;
