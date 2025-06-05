import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import CategoryCard from '../components/CategoryCard';
import CreateCategoryModal from '../components/CreateCategoryModal';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        setEditingCategory(category);
        setShowModal(true);
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

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/categories/upload', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        });
        return response.data;
    };

    const handleCreate = async (categoryName, imageFile) => {
        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }
            await api.post('/categories', {
                categoryName,
                imageUrl
            });
            setShowModal(false);
            loadCategories();
        } catch (error) {
            console.error('Erro ao criar categoria', error);
        }
    };

    const handleUpdate = async (updateCategory) => {
        try {
            let imageUrl = updateCategory.imageUrl || null;

            if (updateCategory.imageFile) {
                imageUrl = await uploadImage(updateCategory.imageFile);
            }

            await api.put(`/categories/${updateCategory.id}`, {
                categoryName: updateCategory.categoryName,
                imageUrl
            });
            setShowModal(false);
            setEditingCategory(null);
            loadCategories();
        } catch (error) {
            console.error('Erro ao atualizar a categoria', error);
        }
    };
    const filteredCategories = categories.filter((cat) =>
        cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '30px' }}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="🔍Buscar categoria"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.header}>
                <div style={styles.caixaDoTitulo}>
                    <h1 style={styles.tituloPrincipal}>Categorias</h1>
                </div>
                <button onClick={() => setShowModal(true)} style={styles.botaoAdicionar}>
                    + Nova Categoria
                </button>
            </div>

            <div style={styles.grid}>
                <AnimatePresence>
                    {filteredCategories.map((cat) => (
                        <motion.div
                            key={cat.categoryId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <CategoryCard
                                category={cat}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {showModal && (
                <CreateCategoryModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingCategory(null);
                    }}
                    onSubmit={(data) => {
                        if (editingCategory) {
                            handleUpdate({ id: editingCategory.categoryId, ...data });
                        } else {
                            handleCreate(data.categoryName, data.imageFile);
                        }
                    }}
                    existingCategory={editingCategory}
                />
            )}
        </div>
    );
};

const styles = {

    caixaDoTitulo: {
        backgroundColor: '#e60000',
        padding: '20px 80px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    tituloPrincipal: {
        color: 'white',
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
        marginTop: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    botaoAdicionar: {
        padding: '20px 80px',
        backgroundColor: '#e60000',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    },
    searchInput: {
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        width: '220px',
        fontSize: '14px',
    },
};

export default Categories;
