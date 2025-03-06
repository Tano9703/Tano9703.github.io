let contadorProductos = 0; // Lleva el registro de los productos agregados

function agregarProducto() {
    contadorProductos++;
    
    const div = document.createElement('div');
    div.className = 'producto-container';
    div.setAttribute('id', 'productoDiv' + contadorProductos);

    div.innerHTML = `
        <input type="text" id="producto${contadorProductos}" placeholder="Nombre del producto">
        <input type="number" id="cantidad${contadorProductos}" placeholder="Cantidad">
        <select id="unidad${contadorProductos}">
            <option value="gramos">Gramos</option>
            <option value="kilogramos">Kilogramos</option>
        </select>
        <input type="number" id="precio${contadorProductos}" placeholder="Precio por gramo/kg">
    `;

    document.getElementById('productos').appendChild(div);
}

// Agregar el primer producto al cargar la página
agregarProducto();

document.getElementById('agregarProducto').addEventListener('click', agregarProducto);

document.getElementById('costForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let resultados = '';
    let totalCostos = 0;
    let alMenosUnProducto = false;

    for (let i = 1; i <= contadorProductos; i++) {
        const producto = document.getElementById('producto' + i).value.trim();
        const cantidad = document.getElementById('cantidad' + i).value.trim();
        const unidad = document.getElementById('unidad' + i).value;
        const precio = document.getElementById('precio' + i).value.trim();

        if (producto === '' && cantidad === '' && precio === '') {
            continue; // Ignorar productos vacíos
        }

        if (producto === '' || cantidad === '' || precio === '') {
            alert(`Por favor, completa todos los campos del producto ${i} o déjalo vacío.`);
            return;
        }

        const cantidadNum = parseFloat(cantidad);
        const precioNum = parseFloat(precio);

        if (!isNaN(cantidadNum) && !isNaN(precioNum)) {
            alMenosUnProducto = true;

            let cantidadConvertida = unidad === "kilogramos" ? cantidadNum * 1000 : cantidadNum;
            const totalCosto = cantidadConvertida * precioNum;

            resultados += `<p><strong>${producto} (${cantidadNum} ${unidad}):</strong> $${totalCosto.toFixed(2)}</p>`;
            totalCostos += totalCosto;
        }
    }

    if (alMenosUnProducto) {
        resultados += `<p><strong>Total de todos los costos: </strong>$${totalCostos.toFixed(2)}</p>`;
        document.getElementById('costosResultados').innerHTML = resultados;
    } else {
        alert('Por favor, completa al menos un producto con todos sus datos.');
    }
});

// Funcionalidad de la mini calculadora
function calcInput(value) {
    document.getElementById('calcDisplay').value += value;
}

function calcClear() {
    document.getElementById('calcDisplay').value = '';
}

function calcCalculate() {
    try {
        document.getElementById('calcDisplay').value = eval(document.getElementById('calcDisplay').value);
    } catch {
        alert('Expresión no válida');
    }
}
