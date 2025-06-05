import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import ProductCard from '../components/ProductCard.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import CreateProductModal from '../components/CreateProductModal.jsx';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const loadProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await api.delete(`/products/${productId}`);
                alert('Produto excluído com sucesso!');
                loadProducts();
            } catch (error) {
                console.error('Erro ao excluir produto', error);
            }
        }
    };


    const handleCreate = async ({ productName, productDescription, productPrice, categoryId }) => {
        try {
            await api.post('/products', {
                productName,
                productDescription,
                productPrice,
                categoryId
            });
            setShowModal(false);
            loadProducts();
        } catch (error) {
            console.error('Erro ao criar produto', error);
        }
    };

    const handleUpdate = async (updateProduct) => {
        try {
            await api.put(`/products/${updateProduct.id}`, {
                productName: updateProduct.productName,
                productDescription: updateProduct.productDescription,
                productPrice: updateProduct.productPrice,
                categoryId: updateProduct.categoryId
            });
            setShowModal(false);
            setEditingProduct(null);
            loadProducts();
        } catch (error) {
            console.error('Erro ao atualizar o produto', error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '30px' }}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="🔍 Buscar produto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.header}>
                <div style={styles.caixaDoTitulo}>
                    <h1 style={styles.tituloPrincipal}>Produtos</h1>
                </div>
                <button onClick={() => setShowModal(true)} style={styles.botaoAdicionar}>
                    + Novo Produto
                </button>
            </div>

            <div style={styles.grid}>
                <AnimatePresence>
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.productId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <ProductCard
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {showModal && (
                <CreateProductModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    onSubmit={(data) => {
                        if (editingProduct) {
                            handleUpdate({ id: editingProduct.productId, ...data });
                        } else {
                            handleCreate(data);
                        }
                    }}
                    existingProduct={editingProduct}
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

export default Products;
