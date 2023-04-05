import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, useTheme } from "@mui/material";
import PostWidget from "../widgets/PostWidget";
import { useSelector } from "react-redux";

function Post() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const { token } = useSelector((state) => state.user);
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const postData = await response.json();
      setPost(postData);
    }
    fetchPost();
  }, [postId, token]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = post;

  return (
    <Box padding="2rem" margin="0 auto">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        BeReal
      </Typography>
      <Box width="80vh" margin="auto">
        <PostWidget
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
          isProfile={false}
          isShared={true}
        />
      </Box>
    </Box>
  );
}

export default Post;
