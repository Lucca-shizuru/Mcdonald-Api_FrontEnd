import React from 'react'

const Home = () => {
    return (
        <div style={styles.container}>
            <img
                src={"/banner.jpg"}
                alt="Banner McDonald's"
                style={styles.banner}
            />
            <h1 style={styles.title}>Bem-vindo ao sistema interno do McDonald's!</h1>
            <p style ={styles.subtitle}>Veja nossas categorias e produtos deliciosos 🍔</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center"
    },
    banner: {
        width: '100%',
        height: 'auto',
        maxHeight:'600px',
        objectFit: 'cover',
    },
    title: {
        fontSize: '2.5rem',
        marginTop: '20px',
    },
    subtitle: {
        fontSize: '1.2rem',
    },
};

export default Home;