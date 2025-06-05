import React, { useEffect, useState } from 'react';

const CreateProductModal = ({ onClose, onSubmit, existingProduct, categories = [] }) => {
    const [productName, setProductName] = useState(existingProduct?.productName || '');
    const [productDescription, setProductDescription] = useState(existingProduct?.productDescription || '');
    const [productPrice, setProductPrice] = useState(existingProduct?.productPrice || '');
    const [categoryId, setCategoryId] = useState(existingProduct?.category?.categoryId || '');

    useEffect(() => {
        if (existingProduct) {
            setProductName(existingProduct.productName);
            setProductDescription(existingProduct.productDescription);
            setProductPrice(existingProduct.productPrice);
            setCategoryId(existingProduct.category?.categoryId);
        }
    }, [existingProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !productDescription || !productPrice || !categoryId) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        await onSubmit({
            productName,
            productDescription,
            productPrice,
            categoryId,
        });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.titulo}>
                    {existingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Descrição do Produto"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        style={styles.input}
                        rows={3}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        style={styles.input}
                        step="0.01"
                        min="0"
                    />
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>

                    <div style={styles.actions}>
                        <button type="submit" style={styles.saveButton}>Salvar</button>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    titulo: {
        color: '#ffcc00',
        backgroundColor: '#e60000',
        padding: '10px 18px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        marginBottom: '10px',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        width: '350px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '10px 0',
        borderRadius: '6px',
        border: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '14px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '16px',
    },
    saveButton: {
        backgroundColor: '#e60000',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
};

export default CreateProductModal;
