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

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});