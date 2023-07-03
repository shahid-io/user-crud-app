  <!-- /** handle file upload */
  // const handleUpload = async () => {
  //   const file = fileRef.current.files[0];
  //   const uploadRef = ref(storage, file?.name);
  //   uploadBytes(uploadRef, file).then(() => {
  //     getDownloadURL(uploadRef).then((res) => {
  //       console.log(res);
  //       setProfileUrl(res);
  //     });
  //   });
  // }; -->

```
import React, { useState } from "react";
import "../styles/UserCard.css";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserCard = (props) => {
const {
  profile,
  firstName,
  lastName,
  email,
  phone,
  address,
  deleteUser,
  updateUser,
} = props;
const [showModal, setShowModal] = useState(false);
const [showUpdateModal, setShowUpdateModal] = useState(false);

const handleDelete = () => {
  deleteUser();
  setShowModal(false);
};

const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

const handleUpdate = async (values) => {
  /** code-warning */
  const { firstName, lastName, email, phone, address } = values;
  const updatedUser = {
    firstName,
    lastName,
    email,
    phone,
    address,
    profile: profile,
  };
  const file = fileRef.current.files[0];
  if (file) {
    // If a new image is selected, upload it to Firebase Storage
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    updatedUser.profile = downloadURL; // Update the profile image URL with the new image URL
  }
  updateUser(updatedUser, values.profile);
  setShowUpdateModal(false);
  /** code-warning */
  // updateUser(values);
  // setShowUpdateModal(false);
};

const handleOpenUpdateModal = () => {
  setShowUpdateModal(true);
};

const handleCloseUpdateModal = () => {
  setShowUpdateModal(false);
};
/** profile update code */

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

return (
  <div className="container p-5">
    <div className="card user-card p-3">
      <div className="profile-container">
        <img src={profile} alt="Profile" className="profile_img" />
      </div>
      <h2>
        {firstName} {lastName}
      </h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
      <div className="d-flex gap-5 justify-content-center">
        <Link to="#" onClick={handleOpenModal}>
          <AiOutlineDelete color="orange" size={30} />
        </Link>
        <Link to="#" onClick={handleOpenUpdateModal}>
          <FiEdit color="green" size={30} className="updateBtn" />
        </Link>
      </div>
      {/* delete user modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update user modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              profile: profile,
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              address: address,
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="container mb-3">
                  <label htmlFor="profile">
                    <img
                      src={profile}
                      alt="profile"
                      className="rounded-pill profile_img"
                    />
                    <input
                      type="file"
                      id="profile"
                      name="profile"
                      className={`form-control ${
                        errors.profile && touched.profile ? "is-invalid" : ""
                      }`}
                      ref={fileRef}
                      onChange={handleFileChange}
                    />
                  </label>
                  <ErrorMessage
                    name="profile"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {/* firstname */}
                <div className="mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${
                      errors.firstName && touched.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${
                      errors.lastName && touched.lastName ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {/* email */}
                <div className="mb-3">
                  <label htmlFor="firstName">Email</label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className={`form-control ${
                      errors.email && touched.email ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {/* phone */}
                <div className="mb-3">
                  <label htmlFor="phone">Phone</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className={`form-control ${
                      errors.phone && touched.phone ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {/* address */}
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className={`form-control ${
                      errors.address && touched.address ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <Button type="submit" variant="outline-primary">
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  </div>
);
};

export default UserCard;
```
