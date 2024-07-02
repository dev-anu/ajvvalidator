import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ajvValidate } from "./Ajv";

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        requireUsername: false,
        username: "",
        email: "",
        password: "",
      }}
      validate={ajvValidate}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form data:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div>
            <label>
              <Field type="checkbox" name="requireUsername" />
              Require Username
            </label>
          </div>
          {values.requireUsername && (
            <div>
              <label>Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
          )}
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
