import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, Unfollow } from "../../redux/actions/profileActions";

const FollowButton = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false)
  

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleFollow = () => {
    if(isFollowLoading) return
    setIsFollowLoading(true)
    
    dispatch(follow({ users: profile.users, user, auth }));
    setFollowed(true);
    
    setIsFollowLoading(false)
  };
  
  const handleUnfollow = () => {
    if(isFollowLoading) return
    setIsFollowLoading(true)

    dispatch(Unfollow({ users: profile.users, user, auth }));
    setFollowed(false);
    
    setIsFollowLoading(false)
  };

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {setFollowed(true);}
  }, [auth.user.following, user._id]);

  return (
    <>
      {auth.user._id === user._id ? "" : (followed ? (
        <Button variant="outlined" onClick={handleUnfollow}>
          Unfollow
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleFollow}>
          Follow
        </Button>
      ))}
    </>
  );
};

export default FollowButton;
