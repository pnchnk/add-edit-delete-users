import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useAppDispatch } from "../store/hooks";
import { editUser } from "../store/slices/users";
//import { addToList } from "../store/slices/users";
import { useUpdateUserMutation } from "../store/api/users";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  address: Yup.object().shape({
    city: Yup.string().required("City is required"),
  }),
  phone: Yup.string().required("Required"),
  website: Yup.string().required("Required"),
});

const EditForm = ({ id }: any) => {
  const initialValues = {
    id,
    name: "",
    username: "",
    email: "",
    address: {
      city: "",
    },
    phone: "",
    website: "",
  };

  const dispatch = useAppDispatch();

  const [showMessage, setShowMessage] = useState<boolean>(false);

  const [updateUser, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation();

  const handleSubmit = async (values: any) => {
    try {
      if(values.id > 1){
        await updateUser(values);
      } else {
        dispatch(editUser(values));
      }
      
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Form className="form" style={{ backgroundColor: "white", zIndex:3, position:"absolute", top:"10%", left:"40%" }}>
              <h3 style={{ textAlign: "center" }}>Edit user</h3>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="name"
                  style={{
                    marginRight: "10px",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  Name:
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  style={{ outline: "none", border: "none" }}
                />
                {errors.name && touched.name && (
                  <div>
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {errors.name}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="username"
                  style={{
                    marginRight: "10px",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  Username:
                </label>
                <Field
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  style={{ outline: "none", border: "none" }}
                />
                {errors.username && touched.username && (
                  <div>
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {errors.username}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="email"
                  style={{
                    marginRight: "10px",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  Email:
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  style={{ outline: "none", border: "none" }}
                />
                {errors.email && touched.email && (
                  <div>
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {errors.email}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="city"
                  style={{
                    marginRight: "10px",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  City:
                </label>
                <Field
                  id="city"
                  name="address.city"
                  placeholder="Enter your city"
                  style={{ outline: "none", border: "none" }}
                />
                {errors.address?.city && touched.address?.city && (
                  <div>
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {errors.address?.city}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="phone"
                  style={{
                    marginRight: "10px",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  Phone:
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="string"
                  placeholder="Enter your phone"
                  style={{ outline: "none", border: "none" }}
                />
                {errors.phone && touched.phone && (
                  <div>
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {errors.phone}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="website"
                  style={{
                    marginRight: "10px",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  Website:
                </label>
                <Field
                  id="website"
                  name="website"
                  type="string"
                  placeholder="Enter website"
                  style={{ outline: "none", border: "none" }}
                />
                {errors.website && touched.website && (
                  <div>
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {errors.website}
                    </span>
                  </div>
                )}
              </div>
              <button type="submit" className="form-button">
                Edit user
              </button>
            </Form>
          </div>
        )}
      </Formik>
      {showMessage && <div className="modalSubmit">User added</div>}
    </>
  );
};

export default EditForm;
