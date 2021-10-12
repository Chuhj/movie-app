import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
  const defaultRemember = localStorage.getItem('remember');
  const defaultEmail = localStorage.getItem('email');

  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({ mode: 'onChange' });

  const handleRemember = (data) => {
    if (data.remember) {
      localStorage.setItem('remember', 'true');
      localStorage.setItem('email', data.email);
    } else {
      localStorage.setItem('remember', 'false');
      localStorage.removeItem('email');
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    localStorage.removeItem('remember');
    dispatch(loginUser(data)).then((response) => {
      if (response.payload.loginSuccess) {
        handleRemember(data);
        props.history.push('/');
      } else {
        alert(response.payload.msg);
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Form
        onFinish={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
      >
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          defaultValue={defaultEmail}
          render={({ field }) => (
            <Input {...field} size="large" placeholder="Email" />
          )}
        />

        <label>Password</label>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input.Password {...field} size="large" placeholder="Password" />
          )}
        />

        <Controller
          name="remember"
          control={control}
          defaultValue={defaultRemember}
          render={({ field }) => (
            <Checkbox onChange={field.onChange} checked={field.value}>
              Remember me
            </Checkbox>
          )}
        />

        <Link to="/register">Register</Link>

        <Button htmlType="submit">Login</Button>
      </Form>
    </div>
  );
}

export default withRouter(LoginPage);
