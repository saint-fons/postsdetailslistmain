import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, FormikHelpers } from "formik";
import { IPickedUser, UserListProps } from "../../types/types";

const PickedUserForm: FC<UserListProps> = ({ pickedUser }) => {
  const [user, setUser] = useState<any[]>([]);

  async function fetchPosts(pickedUser) {
    try {
      const response = await axios.get<IPost>(
        `https://jsonplaceholder.typicode.com/users/${pickedUser}`
      );
      setUser(response.data);
    } catch (e) {
      alert(e);
    }
  }

  /* Получаем нового пользователя после выбора */
  useEffect(() => {
    /* Пропускаем первый вызов */
    if (Number(pickedUser) === 0) {
    } else {
      fetchPosts(pickedUser);
    }
  }, [pickedUser]);

  return (
    <div>
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

          {/* <button type="submit">Submit</button> */}
        </Form>
      </Formik>
    </div>
  );
};

export default PickedUserForm;
