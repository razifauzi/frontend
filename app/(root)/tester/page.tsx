import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export default async function Page() {
  const res = await fetch('http://localhost:8080/api/v1/users', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: User[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
