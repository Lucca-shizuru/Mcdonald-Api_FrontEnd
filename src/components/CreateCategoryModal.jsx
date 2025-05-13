import React, { useState } from 'react';

const CreateCategoryModal = ({ onClose, onSubmit }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;
        onSubmit({ categoryName });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.novaCategoria}>Nova Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome da Categoria"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        style={styles.input}
                    />
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
    novaCategoria: {
        color: '#ffcc00',
        backgroundColor: '#e60000',
        padding: '10px 20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '6px',
        border: '1px solid #ccc',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#e60000',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
    }
};

export default CreateCategoryModal;
