
// Funciones para la calculadora
function appendValue(value) {
    document.getElementById('calcDisplay').value += value;
}

function clearDisplay() {
    document.getElementById('calcDisplay').value = '';
}

function calculateResult() {
    var display = document.getElementById('calcDisplay');
    try {
        display.value = eval(display.value);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Operación inválida',
        });
        display.value = '';
    }
}

function calcularCostos() {
    var productosDiv = document.getElementById('productos');
    var productos = productosDiv.getElementsByClassName('form-group');
    var costoTotal = 0;
    var detalles = '';

    for (var i = 1; i <= productos.length / 4; i++) {
        var cantidad = parseFloat(document.getElementById('cantidad' + i).value);
        var precio = parseFloat(document.getElementById('precio' + i).value);
        var unidad = document.getElementById('unidad' + i).value;

        if (!isNaN(cantidad) && !isNaN(precio) && cantidad > 0 && precio > 0) {
            var costoProducto = cantidad * precio;

            if (unidad === 'g') {
                costoProducto = cantidad * precio; // Precio directo por gramo
            }

            costoTotal += costoProducto;

            detalles += `<p>Producto ${i}: ${cantidad} ${unidad} x $${precio} = $${costoProducto.toFixed(2)}</p>`;
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Datos inválidos',
                text: 'Por favor, completa todos los campos con valores válidos.',
            });
            return;
        }
    }

    document.getElementById('costosResultados').innerHTML = `
        <div>${detalles}</div>
        <p id="costoTotal" class="costoTotal"><strong>Costo Total:</strong> $${costoTotal.toFixed(2)}</p>
    `;

    Swal.fire({
        icon: 'success',
        title: 'Cálculo exitoso',
        text: `El costo total es $${costoTotal.toFixed(2)}`,
    });
}

document.getElementById('agregarProducto').addEventListener('click', function () {
    var productosDiv = document.getElementById('productos');
    var newProductIndex = productosDiv.getElementsByClassName('form-group').length / 4 + 1;
    var newProductHTML = `
        <div class="form-group text-center btn-warning rounded p-2">
            <label for="producto${newProductIndex}">PRODUCTO ${newProductIndex}</label>
            <input type="text" class="form-control" id="producto${newProductIndex}" placeholder="Nombre del producto">
        </div>
        <div class="form-group">
            <label for="cantidad${newProductIndex}">Cantidad</label>
            <input type="number" class="form-control" id="cantidad${newProductIndex}" placeholder="Cantidad">
        </div>
        <div class="form-group">
            <label for="unidad${newProductIndex}">Unidad</label>
            <select class="form-control" id="unidad${newProductIndex}">
                <option value="kg">Kilogramos (kg)</option>
                <option value="g">Gramos (g)</option>
                <option value="unidad">Unidad</option>
            </select>
            <div class="form-group">
            <label for="precio${newProductIndex}">Precio</label>
            <input type="number" class="form-control" id="precio${newProductIndex}" placeholder="Precio">
        </div>
        </div>`;
    productosDiv.insertAdjacentHTML('beforeend', newProductHTML);
});

document.getElementById('costForm').addEventListener('submit', function (event) {
    event.preventDefault();
    calcularCostos();
});