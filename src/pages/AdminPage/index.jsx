const AdminPanelPage = () => {
  //   if (isLoading) return <p>Завантаження...</p>;
  //   if (error) return <p>Помилка при завантаженні користувачів</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Адмін панель</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Ім'я користувача</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Завершені подорожі</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => ( */}
          <tr
            //   key={user.id}
            className="text-center"
          >
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanelPage;
