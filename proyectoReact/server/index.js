const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pruebas_act"
});

// Endpoint para crear una nueva membresía de usuario
app.post("/create", (req, res) => {
    const { id_usuario, id_membresia, nombre_plan, confirmacion_compra } = req.body;

    db.query(
        'INSERT INTO usuario_membresias (id_usuario, id_membresia, nombre_plan, confirmacion_compra) VALUES (?, ?, ?, ?)',
        [id_usuario, id_membresia, nombre_plan, confirmacion_compra],
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

// Endpoint para obtener todas las membresías de usuario
app.get("/usuario_membresias", (req, res) => {
    db.query(
        'SELECT * FROM usuario_membresias',
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

// Endpoint para actualizar una membresía de usuario
app.put("/update", (req, res) => {
    const { id_usuario_membresia, id_usuario, id_membresia, fecha_inicio, fecha_fin, nombre_plan, confirmacion_compra } = req.body;
    
    // Validar que todos los campos necesarios estén presentes en la solicitud
    if (!id_usuario_membresia || !id_usuario || !id_membresia || !fecha_inicio || !fecha_fin || !nombre_plan || confirmacion_compra === undefined) {
        return res.status(400).send("Todos los campos son requeridos");
    }
    
    db.query(
        'UPDATE usuario_membresias SET id_usuario = ?, id_membresia = ?, fecha_inicio = ?, fecha_fin = ?, nombre_plan = ?, confirmacion_compra = ? WHERE id_usuario_membresia = ?',
        [id_usuario, id_membresia, fecha_inicio, fecha_fin, nombre_plan, confirmacion_compra, id_usuario_membresia],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro actualizado:", result);
                res.send("Membresía de usuario actualizada exitosamente");
            }
        }
    );
});

// Endpoint para eliminar una membresía de usuario
app.delete("/delete/:id_usuario_membresia", (req, res) => {
    const id_usuario_membresia = req.params.id_usuario_membresia;

    db.query(
        'DELETE FROM usuario_membresias WHERE id_usuario_membresia = ?',
        [id_usuario_membresia],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro eliminado:", result);
                res.send("Membresía de usuario eliminada exitosamente");
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});
