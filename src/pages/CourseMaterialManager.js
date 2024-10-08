import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './courseMaterialManager.css'

const CourseMaterialManager = () => {
    const [materials, setMaterials] = useState([]);
    const [form, setForm] = useState({
        section_name: '',
        item_type: 'video',
        item_name: '',
        authorized: false,
        url: ''
    });

    const [notification, setNotification] = useState({ message: '', type: '' });

    const fetchMaterials = async () => {
        const response = await axios.get('https://course-backend-ajbr.onrender.com/api/materials');
        setMaterials(response.data);
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const modifiedForm = {
            ...form,
            url: form.url.slice(0, -4) + 'raw=1'
        };
    
        try {
            await axios.post('https://course-backend-ajbr.onrender.com/api/materials', modifiedForm);
            setNotification({ message: 'New item added successfully!', type: 'success' });
            fetchMaterials(); // Fetch updated materials list
            setForm({ section_name: '', item_type: 'video', item_name: '', authorized: false, url: '' });
        } catch (error) {
            setNotification({ message: 'Error adding item: ' + (error.response?.data?.message || error.message), type: 'error' });
        }
    };
    

    const handleDelete = async (id) => {
        await axios.delete(`https://course-backend-ajbr.onrender.com/api/materials/${id}`);
        setNotification({ message: 'Item deleted successfully!', type: 'deleted' });
        fetchMaterials();
    };

    const handleEdit = async (id) => {
        const updatedItem = materials.find(material => material.id === id);
    
        // Modify the URL by removing the last 4 characters and appending "raw=1"
        const modifiedItem = {
            ...updatedItem,
            url: updatedItem.url.slice(0, -4) + 'raw=1'
        };
    
        try {
            await axios.put(`https://course-backend-ajbr.onrender.com/api/materials/${id}`, modifiedItem);
            setNotification({ message: 'Item edited successfully!', type: 'success' });
            fetchMaterials();
        } catch (error) {
            setNotification({ message: 'Error editing item: ' + (error.response?.data?.message || error.message), type: 'error' });
        }
    };
    

    return (
        <div>
            <h2 id='header-manager'>Course Material Manager</h2>
            {notification.message && (
                <div className={`alert ${notification.type === 'success' ? 'alert-success' : 'deleted'}`}>
                    {notification.message}
                </div>
            )}
            <form className='formManager' onSubmit={handleSubmit}>
                <input name="section_name" placeholder="Section Name" value={form.section_name} onChange={handleInputChange} required />
                <select name="item_type" value={form.item_type} onChange={handleInputChange}>
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                </select>
                <input name="item_name" placeholder="Item Name" value={form.item_name} onChange={handleInputChange} required />
                <label>
                    not Free:
                    <input name="authorized" type="checkbox" checked={form.authorized} onChange={handleInputChange} />
                </label>
                <input name="url" placeholder="URL" value={form.url} onChange={handleInputChange} required />
                <button type="submit">Add Material</button>
            </form>

            <h3>Saved Materials</h3>
            <table>
                <thead>
                    <tr>
                        <th>Section Name</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>not Free</th>
                        <th>URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(material => (
                        <tr key={material.id}>
                            <td><input value={material.section_name} onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, section_name: e.target.value } : m))} /></td>
                            <td><select value={material.item_type} onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, item_type: e.target.value } : m))}>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                            </select></td>
                            <td><input value={material.item_name} onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, item_name: e.target.value } : m))} /></td>
                            <td><input type="checkbox" checked={material.authorized} onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, authorized: e.target.checked } : m))} /></td>
                            <td><input value={material.url} onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, url: e.target.value } : m))} /></td>
                            <td>
                                <button onClick={() => handleEdit(material.id)}>Save</button>
                                <button onClick={() => handleDelete(material.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseMaterialManager;
