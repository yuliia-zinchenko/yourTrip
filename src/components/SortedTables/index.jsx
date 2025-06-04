import React from "react";
import { useGetSortedRoutesQuery } from "../../redux/profile/profileApi";
import css from "./styled.module.css";

export const SortedRoutesTables = () => {
  const { data, isLoading, error } = useGetSortedRoutesQuery();

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

  return (
    <div>
      <h2 className={css.h2}>Послідовне сортування</h2>
      <table>
        <thead>
          <tr>
            <th>Ім’я</th>
            <th>Email</th>
            <th>Кількість маршрутів</th>
          </tr>
        </thead>
        <tbody>
          {data?.sequentialResult?.userRoutes.map(({ user, routesCount }) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{routesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Паралельне сортування</h2>
      <table>
        <thead>
          <tr>
            <th>Ім’я</th>
            <th>Email</th>
            <th>Кількість маршрутів</th>
          </tr>
        </thead>
        <tbody>
          {data?.parallelResult?.userRoutes.map(({ user, routesCount }) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{routesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
