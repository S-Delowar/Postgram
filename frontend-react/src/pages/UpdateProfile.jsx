import React from "react";
import Layout from "../components/Layout";
import UpdateProfileForm from "../forms/UpdateProfileForm";
import { Navigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helper/axios";
import { getUser } from "../hooks/user.actions";
import { useLoggedInUserSWR, useUserSWR } from "../helper/getUser";

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
