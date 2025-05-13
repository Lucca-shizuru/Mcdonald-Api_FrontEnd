import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import CategoryCard from '../components/CategoryCard';
import CreateCategoryModal from '../components/CreateCategoryModal';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const loadCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias', error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleEdit = (category) => {
        alert(`Editar categoria: ${category.categoryName}`);
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                await api.delete(`/categories/${categoryId}`);
                alert('Categoria excluída com sucesso!');
                loadCategories();
            } catch (error) {
                console.error('Erro ao excluir categoria', error);
            }
        }
    };

    const handleCreate = async (newCategory) => {
        try {
            await api.post('/categories', newCategory);
            setShowModal(false);
            loadCategories();
        } catch (error) {
            console.error('Erro ao criar categoria', error);
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <div style={styles.header}>
                <div style={styles.titleBox}>
                    <h1 style={styles.title}>Categorias</h1>
                </div>
                <button onClick={() => setShowModal(true)} style={styles.addButton}>
                    + Nova Categoria
                </button>
            </div>

            <div style={styles.grid}>
                {categories.map((cat) => (
                    <CategoryCard
                        key={cat.categoryId}
                        category={cat}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showModal && (
                <CreateCategoryModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleCreate}
                />
            )}
        </div>
    );
};

const styles = {
    titleBox: {
        backgroundColor: '#e60000',
        padding: '10px 20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    title: {
        color: 'white',
        margin:0,
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButton: {
        padding: '10px 16px',
        backgroundColor: '#e60000',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

export default Categories;
