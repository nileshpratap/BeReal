import { Box } from "@mui/material";

const UserImage = ({ image, size = "50px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        crossOrigin="anonymous"
        src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
