// Obtener todas las PCs
fetch('http://localhost/javascrip/pc_api.php')
  .then(response => response.json())
  .then(data => {
    console.log('PCs:', data);
    const pcList = document.getElementById('pc-list');
    const tbody = pcList.querySelector('tbody');

    // Limpiar la tabla antes de agregar nuevos datos
    tbody.innerHTML = '';

    // Iterar sobre los datos y agregar cada PC a la tabla
    data.forEach(pc => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${pc.nombre}</td>
        <td>${pc.estado}</td>
        <td>${pc.modelo}</td>
        <td>${pc.n_serie}</td>
        <td>${pc.teclado}</td>
        <td>${pc.mouse}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(error => console.error('Error al obtener PCs:', error));
