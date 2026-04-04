const express = require('express');
const path = require('path'); // <--- ESTA ES LA LÍNEA QUE TE FALTA
const app = express();

// ESTA ES LA LÍNEA CLAVE:
// Le dice a Express que todo lo que esté en 'public' se puede ver desde el navegador
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz - MODIFICADA PARA EL EJERCICIO 2
app.get('/', (req, res) => {
  // En lugar de enviar texto, enviamos el archivo HTML que creaste en 'public'
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/acerca', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'acerca.html'));
});

app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Ruta para recibir los datos del formulario
app.post('/contacto', (req, res) => {
    // Los datos llegan en req.body gracias al "name" que pusimos en el HTML
    const { nombre, mensaje } = req.body;

    // El ejercicio pide responder con un HTML que muestre los datos
    res.send(`
        <div style="font-family: sans-serif; padding: 20px;">
            <h1>¡Gracias por tu mensaje, ${nombre}!</h1>
            <p>Hemos recibido lo siguiente: "${mensaje}"</p>
            <a href="/">Volver al inicio</a>
        </div>
    `);
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});