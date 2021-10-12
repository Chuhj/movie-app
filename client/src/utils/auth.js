import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { authUser } from '../_actions/user_action';

export default function Auth(Component, restricted, adminRoute = null) {
  return function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authUser()).then((response) => {
        if (response.payload.isAuth && restricted === false) {
          props.history.push('/');
        } else if (!response.payload.isAuth && restricted === true) {
          props.history.push('/login');
        }
      });
    }, []);

    return <Component props={props} />;
  };
}
