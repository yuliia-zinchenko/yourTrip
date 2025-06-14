import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useGetCurrentUserQuery} from "../redux/auth/authApi";
import { setCredentials } from "../redux/auth/authSlice";

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data, error } = useGetCurrentUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  return { user: data, error };
};
