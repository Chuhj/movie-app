import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const password = useRef();
  password.current = watch('password');

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Register Failed!');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
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
          render={({ field }) => <Input {...field} />}
        />
        {errors.email?.type === 'required' && 'Email is required!'}
        {errors.email?.type === 'pattern' && 'Please write email address!'}

        <label>Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.name?.type === 'required' && 'Name is required!'}

        <label>Password</label>
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 5 }}
          render={({ field }) => <Input.Password {...field} />}
        />
        {errors.password?.type === 'required' && 'Password is required!'}
        {errors.password?.type === 'minLength' &&
          'Password must have at least 5 characters'}

        <label>Confirm Password</label>
        <Controller
          name="confirm_password"
          control={control}
          rules={{
            required: true,
            minLength: 5,
            validate: (value) => value === password.current,
          }}
          render={({ field }) => <Input.Password {...field} />}
        />
        {errors.confirm_password?.type === 'validate' &&
          'The passwords do not match!'}
        <Link to="/login">Login</Link>

        <Button htmlType="submit">Register</Button>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
