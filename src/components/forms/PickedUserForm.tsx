import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { IPickedUser, UserListProps } from "../../types/types";
import style from "../../styles/ProfileStyle.module.css";

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
          <div className={style.container}>
            <div className={style.container__users}>
              Вы выбрали пользователя: 
              {" " + user.name}</div>

            <div className={style.container__users}>
              Номер телефона пользователя: 
            {" " + user.phone}</div>

            <div className={style.container__users}>
              Логин пользователя: 
            {" " + user.username}</div>
          </div>
          <div className={style.container__form}>
            <label htmlFor="message">Отправить пользователю сообщение</label>
            <Field id="message" name="message" placeholder="Cообщение" />

            <button type="submit">Отправить</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PickedUserForm;
