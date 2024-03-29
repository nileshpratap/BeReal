import Post from "../models/Post.js";
import User from "../models/User.js";

// create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: {},
    });
    await newPost.save();
    const posts = await Post.find(); // we are creating post into db and returning all the posts back
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// read
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// read
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    console.log("post found");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// read
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // to find post
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const { userId, comment } = req.body;
    const { postId } = req.params;
    console.log(req.body);
    const post = await Post.findById(postId);
    post.comments.push(comment); // add new comment to array
    await post.save(); // save changes to database
    res.status(200).json({ data: post.comments });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
