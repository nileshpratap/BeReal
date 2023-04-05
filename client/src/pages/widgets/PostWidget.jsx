import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile,
  isShared = false,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [stateComments, setstateComments] = useState(comments);

  const [commentText, setCommentText] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    try {
      // axios post comment
      if (commentText) await sendComment(commentText);
    } catch (error) {
      alert(error);
    }
  };

  const sendComment = async (commentText) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/addcomment/${postId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
        body: JSON.stringify({ userId: loggedInUserId, comment: commentText }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to save comment");
    } else {
      setstateComments([...stateComments, commentText]);
      setCommentText("");
    }
  };

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const ShareLink = async () => {
    const shareLink = `http://localhost:3000/posts/${postId}`;
    navigator.clipboard.writeText(shareLink);
    window.alert("Link copied! Share it.");
  };

  return (
    <WidgetWrapper m="2rem 0">
      {!isProfile ? (
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          isShared={isShared}
        />
      ) : null}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          crossOrigin="anonymous"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={ShareLink}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <>
          <Box mt="0.5rem" display="flex">
            <form onSubmit={postComment} style={{ flex: 1 }}>
              <TextField
                id="comment-input"
                label="Add a comment"
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </form>
            <Button
              variant="contained"
              color="primary"
              onClick={postComment}
              sx={{ ml: 1 }}
            >
              POST
            </Button>
          </Box>
          <Box mt="0.5rem">
            {stateComments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
