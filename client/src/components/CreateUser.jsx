import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import "../styles/CreateUser.css";
import Button from "react-bootstrap/Button";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import avatar from "../assets/profile.png";
import axios from "axios";
// test code
import Spinner from "react-bootstrap/Spinner";
/** validation schema */
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

const CreateUser = () => {
  const navigate = useNavigate();
  const fileRef = useRef();
  // const [spinner, setSpinner] = useState(false);

  // const [profileUrl, setProfileUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = async () => {
    const file = await fileRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // test code
      const formValid = await validationSchema.isValid(values);
      console.log("form valid-----------" + formValid);
      if (!formValid) {
        return;
      }

      /** test code */
      // setSpinner(true);
      /** test code */

      const file = fileRef.current.files[0];
      const uploadRef = ref(storage, file.name);
      await uploadBytes(uploadRef, file);
      const downloadURL = await getDownloadURL(uploadRef);
      console.log(downloadURL);
      await axios.post("http://localhost:3010/createuser", {
        ...values,
        profile: downloadURL,
      });

      navigate("/users");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="user-wrapper">
      <h5 className="bg-secondary p-2">Create User</h5>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="container d-flex flex-column align-items-center">
            <div className="mb-3">
              <label htmlFor="profilePicture">
                <img
                  src={previewUrl || avatar}
                  alt="profile_img"
                  className="profile-img"
                />
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  ref={fileRef}
                  onChange={handleFileChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="firstName">First Name</label> */}
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="First Name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              {/* <label htmlFor="lastName">Last Name</label> */}
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              {/* <label htmlFor="email">Email</label> */}
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              {/* <label htmlFor="phone">Phone</label> */}
              <Field
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="phone"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              {/* <label htmlFor="address">Address</label> */}
              <Field
                as="textarea"
                id="address"
                name="address"
                className="form-control"
                placeholder="Address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger"
              />
            </div>
            <Button
              variant="outline-dark"
              type="submit"
              className="mb-2 rounded-pill px-5"
              /** test code */
              // onClick={() => setSpinner(true)}
              /** test code */
            >
              {isSubmitting ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
