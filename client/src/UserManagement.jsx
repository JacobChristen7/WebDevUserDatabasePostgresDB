import React, { useEffect, useState } from 'react';

const API_URL = 'https://webdevuserdatabasepostgresdb.onrender.com/users';

function UserForm({ onSave, editingUser, onCancel }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    age: ''
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
        age: editingUser.age
      });
    } else {
      setForm({ first_name: '', last_name: '', email: '', age: '' });
    }
  }, [editingUser]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
    setForm({ first_name: '', last_name: '', email: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-full max-w-md mb-4">
      <div className="mb-2">
        <input
          className="border rounded px-2 py-1 w-full"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          className="border rounded px-2 py-1 w-full"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          className="border rounded px-2 py-1 w-full"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          className="border rounded px-2 py-1 w-full"
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          {editingUser ? 'Update' : 'Add'} User
        </button>
        {editingUser && (
          <button type="button" className="bg-gray-300 px-4 py-1 rounded" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function UserTable({ users, onEdit, onDelete, onSort, sortBy, order }) {
  return (
    <table className="min-w-full bg-white rounded shadow mb-4">
      <thead>
        <tr>
          <th className="p-2 cursor-pointer" onClick={() => onSort('first_name')}>First Name {sortBy === 'first_name' ? (order === 'asc' ? '▲' : '▼') : ''}</th>
          <th className="p-2 cursor-pointer" onClick={() => onSort('last_name')}>Last Name {sortBy === 'last_name' ? (order === 'asc' ? '▲' : '▼') : ''}</th>
          <th className="p-2 cursor-pointer" onClick={() => onSort('email')}>Email {sortBy === 'email' ? (order === 'asc' ? '▲' : '▼') : ''}</th>
          <th className="p-2 cursor-pointer" onClick={() => onSort('age')}>Age {sortBy === 'age' ? (order === 'asc' ? '▲' : '▼') : ''}</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-t">
            <td className="p-2">{user.first_name}</td>
            <td className="p-2">{user.last_name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.age}</td>
            <td className="p-2 flex gap-2">
              <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => onEdit(user)}>Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UserSearch({ onSearch }) {
  const [search, setSearch] = useState('');
  return (
    <div className="mb-4 w-full max-w-md">
      <input
        className="border rounded px-2 py-1 w-full"
        placeholder="Search by first or last name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch(search)}
      />
      <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2 w-full" onClick={() => onSearch(search)}>
        Search
      </button>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [sortBy, setSortBy] = useState('first_name');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');

  const fetchUsers = async (searchTerm = search, sortField = sortBy, sortOrder = order) => {
    let url = `${API_URL}?sortBy=${sortField}&order=${sortOrder}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [sortBy, order]);

  const handleSave = async (form) => {
    if (editingUser) {
      await fetch(`${API_URL}/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setEditingUser(null);
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }
    fetchUsers();
  };

  const handleDelete = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchUsers();
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    fetchUsers(searchTerm);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mt-2">
      <UserSearch onSearch={handleSearch} />
      <UserForm onSave={handleSave} editingUser={editingUser} onCancel={() => setEditingUser(null)} />
      <UserTable users={users} onEdit={setEditingUser} onDelete={handleDelete} onSort={handleSort} sortBy={sortBy} order={order} />
    </div>
  );
}
