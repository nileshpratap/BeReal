import React, { useState } from "react";
import { Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import Navbar from "../../pages/navbar";

const PeopleListWidget = () => {
  const token = useSelector((state) => state.token);
  const [people, setPeople] = useState([]);
  const input = useSelector((state) => state.input);
  const getPeople = async () => {
    const response = await fetch(`http://localhost:3001/users/find/${input}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPeople(data);
  };

  useEffect(() => {
    getPeople();
  }, []);
  console.log(people);
  return (
    <>
      <Navbar />
      <WidgetWrapper margin="1rem auto" width="60vw">
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {people.map((person) => (
            <Friend
              key={person._id}
              friendId={person._id}
              name={`${person.firstName} ${person.lastName}`}
              subtitle={person.occupation}
              userPicturePath={person.picturePath}
            />
          ))}
        </Box>
      </WidgetWrapper>
    </>
  );
};

export default PeopleListWidget;
