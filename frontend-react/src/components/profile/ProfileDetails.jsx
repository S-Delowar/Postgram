import React from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { randomAvatar } from "../../helper/utils";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../helper/axios";
import Post from "../post/Post";
import Layout from "../Layout";
import { useLoggedInUserSWR, useUserSWR } from "../../helper/getUser";

const ProfileDetails = () => {
  const { userId } = useParams();
  console.log(userId);

  // const { data: profileUser, mutate } = useSWR(`/user/${userId}/`, fetcher);

  const { user: profileUser, isLoading: isLoadingProfileUser, isError, mutate: mutateProfileUser } = useUserSWR(userId);
  const { loggedInUser, isLoading: isLoadingLoggedUser } = useLoggedInUserSWR();

  const { data: posts, mutate: mutateUserPost } = useSWR(`/post/by-author/${userId}/`, fetcher);

  console.log(profileUser ? profileUser : "");
  console.log("User's posts: ", posts)

  if (isLoadingProfileUser || isLoadingLoggedUser) {
    return (
       <>
       <p>Loading profile...</p>
       <Spinner></Spinner>
       </>
    );
  }

  if (isError) {
    return (
      <>
      <p>Error! Profile not loaded.</p>
      </>
    )
  }

  return (
    <>
      <Layout>
        <div className="d-flex">
        <Image src={profileUser.avatar || randomAvatar()} roundedCircle width={120} height={120} className="p-2" />
        <div className="p-2">
            <h4>{profileUser.first_name} {profileUser.last_name}</h4>
          <p>Username: {profileUser.username}</p>
          <p>
            <small>Total posts: {profileUser.posts_count}</small>
          </p>
          {loggedInUser.username == profileUser.username && (
            <Button className="btn-sm" as={Link} to={`/user/${profileUser.id}/profile/update/`}>Edit</Button>
          )}
        </div>
      </div>
      <div>
        <h3>Posts:</h3>
        {posts?.map((post)=> <Post key={post.id} post={post} refresh={
          ()=>{
            mutateUserPost();
            mutateProfileUser();
          }
        } onProfileDetailsPage />)}
      </div>
      </Layout>
    </>
  );
};

export default ProfileDetails;
