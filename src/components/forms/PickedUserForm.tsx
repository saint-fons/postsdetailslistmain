import React, { useEffect, useState } from "react";
import { IUsers } from "./types/types";
import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { IPickedUser } from "../../types/types";



const PickedUserForm = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
        }}
        onSubmit={(
          values: IPickedUser,
          { setSubmitting }: FormikHelpers<IPickedUser>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="firstName">Name</label>
          <Field id="name" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Username</label>
          <Field id="username" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PickedUserForm;
