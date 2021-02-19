import React from "react"
import { Field, reduxForm } from "redux-form"
import {
  requiredField,
  maxLengthCreator,
  minLengthCreator,
} from "../../utils/validators";
import { Input } from "../Common/FormsControl";
import s from "./Login.module.css";

const maxLength20 = maxLengthCreator(20)
const minLength4 = minLengthCreator(4);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"login"}
          validate={[requiredField, maxLength20]}
          name={"Login"}
          component={Input}
        />
      </div>
      <div>
        <Field
          placeholder={"password"}
          validate={[requiredField, minLength4]}
          name={"Password"}
          type="password"
          component={Input}
        />
      </div>
      <div className={s.checkBoxFlex}>
        <Field type={"checkbox"} name={"RememberMe"} component={Input} />
        Remember me
      </div>
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
}

const LoginReduxForm = reduxForm({
  form: "Login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className={s.mainLoginForm}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
}

export default Login
