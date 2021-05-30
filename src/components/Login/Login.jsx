import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../redux/authReducer";
import s from "./Login.module.css";


const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Минимальная длина пароля 4 символов")
    .max(50, "Притормози!")
    .required("Обязательное поле"),
  email: Yup.string().email("Невалидный email").required("Обязательное поле"),
  rememberMe: Yup.boolean(),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((s) => s.auth.isAuth);
  const isFetching = useSelector((s) => s.auth.isFetching);
  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div className={s.mainLoginForm}>
      <h1>Вход</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          dispatch(
            login(
              values.email,
              values.password,
              values.rememberMe,
            )
          );
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={s.inputsFlex}>
              <Field
                className={s.regInput}
                placeholder="Введите email"
                name="email"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className={s.formControl}>{errors.email}</div>
              ) : null}
              <Field
                className={s.regInput}
                placeholder="Введите пароль"
                name="password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className={s.formControl}>{errors.password}</div>
              ) : null}
              <div className={s.regCheckbox}>
                <Field
                  name="rememberMe"
                  type="checkbox"
                /> Remember me
              </div>
              <button
                disabled={isFetching}
                className={s.regBtn}
                type="submit"
              >
                Войти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login
