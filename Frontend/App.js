import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: ''
  });
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const loadTasks = () => {
    fetch('http://localhost:8082/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8082/api/tasks/${editingId}`
      : 'http://localhost:8082/api/tasks';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setForm({ title: '', description: '', status: 'pending', due_date: '' });
        setEditingId(null);
        loadTasks();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    fetch(`http://localhost:8082/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => loadTasks())
      .catch(err => console.error(err));
  };

  const handleEdit = task => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      due_date: task.due_date || '',
    });
  };

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#111827' }}>Task Manager</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          marginBottom: '15px',
          padding: '8px 10px',
          width: '100%',
          maxWidth: '400px',
          display: 'block',
          border: '1px solid #d1d5db',
          borderRadius: '6px'
        }}
      />

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: '25px',
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={{ flex: '1 1 200px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          style={{ flex: '2 1 300px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          style={{ flex: '1 1 150px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
        />
        <button
          type="submit"
          style={{
            flex: '0 1 100px',
            padding: '8px 12px',
            backgroundColor: editingId ? '#f59e0b' : '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <thead style={{ backgroundColor: '#e5e7eb' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Due Date</th>
            <th style={{ padding: '10px', border: '1px solid #d1d5db' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{t.title}</td>
              <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{t.description}</td>
              <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{t.status}</td>
              <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{t.due_date}</td>
              <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>
                <button
                  onClick={() => handleEdit(t)}
                  style={{
                    marginRight: '6px',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
