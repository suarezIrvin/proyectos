const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "bdlab"
});

app.post("/nuevo", (req, res) => {
    const { nombre, estado, modelo, serie, mouse, teclado, escritorio } = req.body;

    db.query(
        'INSERT INTO computadoras (nombre, estado, modelo, serie, mouse, teclado, escritorio) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, estado, modelo, serie, mouse, teclado, escritorio],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro exitoso:", result);
                res.status(200).send("Registro exitoso");
            }
        }
    );
});

app.get("/lista", (req, res) => {
    db.query(
        'SELECT * FROM computadoras',       
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/actualizar", (req, res) => {
    const { id, nombre, estado, modelo, serie, mouse, teclado, escritorio } = req.body;
    
    // Validar que todos los campos necesarios estén presentes en la solicitud
    if (!id || !nombre || !estado || !modelo || !serie || !mouse || !teclado || !escritorio) {
        return res.status(400).send("Todos los campos son requeridos");
    }
    
    db.query(
        'UPDATE computadoras SET nombre = ?, estado = ?, modelo = ?, serie = ?, mouse = ?, teclado = ?, escritorio = ? WHERE id = ?',       
        [nombre, estado, modelo, serie, mouse, teclado, escritorio, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro exitoso:", result);
                res.send("Computadora actualizada exitosamente");
            }
        }
    );
});


app.put("/actualizarEstado/:id", (req, res) => {
    const id = req.params.id; // Obtiene el ID de los parámetros de la ruta
    const { estado } = req.body; // Obtiene el nuevo estado de la computadora
    
    // Validar que el estado esté presente en la solicitud
    if (!estado) {
        return res.status(400).send("El campo 'estado' es requerido");
    }
    
    db.query(
        'UPDATE computadoras SET estado = ? WHERE id = ?',       
        [estado, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro actualizado:", result);
                res.send("Estado de la computadora actualizado exitosamente");
            }
        }
    );
});

app.put("/actualizarEscritorio/:id", (req, res) => {
    const id = req.params.id; // Obtiene el ID de los parámetros de la ruta
    const { escritorio } = req.body; // Obtiene el nuevo número de escritorio
    
    // Validar que el número de escritorio esté presente en la solicitud
    if (!escritorio) {
        return res.status(400).send("El campo 'escritorio' es requerido");
    }
    
    db.query(
        'UPDATE computadoras SET escritorio = ? WHERE id = ?',       
        [escritorio, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro actualizado:", result);
                res.send("Escritorio de la computadora actualizado exitosamente");
            }
        }
    );
});


app.delete("/borrar/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        'DELETE FROM computadoras WHERE id = ?',  
      [id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro eliminado:", result);
                res.send("Computadora eliminada exitosamente");
            }
        }
    );
});

app.listen(3005, () => {
    console.log("Servidor corriendo en el puerto 3005");
});
