import React, { FC, useEffect, useState } from "react";
import { IUsers } from "./types/types";
import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { IPickedUser, IPickedUserProps } from "../../types/types";

interface PostsListProps {
  user: IPickedUserProps[];
}

const PickedUserForm: FC<PostsListProps> = ({ pickedUser }) => {
  const [user, setUser] = useState<any[]>([]);

  async function fetchPosts(pickedUser) {
    try {
      const response = await axios.get<IPost>(
        `https://jsonplaceholder.typicode.com/users/${pickedUser.toString()}`
      );
      setUser(response.data);
    } catch (e) {
      alert(e);
    }
  }

  /* Получаем нового пользователя после выбора */
  useEffect(() => {
    fetchPosts(pickedUser);
  }, [pickedUser]);

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
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
          <label htmlFor="firstName">{user.name}</label>
          {/* <Field id="name" name="firstName" placeholder="John" /> */}

          <label htmlFor="lastName">{user.phone}</label>
          {/* <Field id="username" name="lastName" placeholder="Doe" /> */}

          <label htmlFor="email">{user.username}</label>
          {/* <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          /> */}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PickedUserForm;
