"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

import useEditModal from "@/hooks/useEditModal";
import userCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import ImageUpload from "./ImageUpload";

const EditModal = () => {
  const { data: currentUser } = userCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const baseURL = process.env.URL;

  //console.log("currentEditModalUserr: ", currentUser);

  // Data to change
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    //if (currentUser) {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setName(currentUser?.name);
    //}
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.name,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // console.log("Before trying axios.patch");
      // console.log("uUsename: ", username);
      // console.log("bBio: ", bio);
      // console.log("nName: ", name);
      await axios.patch(`${baseURL}/api/edit`, {
        profileImage: profileImage,
        coverImage: coverImage,
        username: username,
        bio: bio,
        name: name,
      });

      // await axios({
      //   method: "patch",
      //   url: "/api/edit",
      //   data: {
      //     profileImage: profileImage,
      //     coverImage: coverImage,
      //     username: username,
      //     bio: bio,
      //     name: name,
      //   },
      // });

      // Use this to load user so that is up to date with the updated data
      mutateFetchedUser();
      //console.log("mutateFetchedUser: ", mutateFetchedUser);
      toast.success("Profile updated successfully!");

      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong! EditModal");
    } finally {
      setIsLoading(false);
    }
  }, [profileImage, coverImage, username, bio, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        actionLabel="Save"
        isOpen={editModal.isOpen}
        onSubmit={onSubmit}
        onClose={editModal.onClose}
        title="Edit Your Profile"
        body={bodyContent}
      />
    </>
  );
};

export default EditModal;
