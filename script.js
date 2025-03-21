// Función para agregar un nuevo producto
document.getElementById('agregarProducto').addEventListener('click', function () {
    var productosDiv = document.getElementById('productos');
    var newProductIndex = productosDiv.getElementsByClassName('form-group').length / 4 + 1;
    
    // HTML del nuevo formulario para el producto
    var newProductHTML = `
        <div class="producto-container" id="producto${newProductIndex}">
            <div class="form-group text-center btn-warning rounded p-2">
                <button type="button" class="close" aria-label="Close" onclick="removeProduct(${newProductIndex})">
                    <span aria-hidden="true">&times;</span>
                </button>
                <label for="productoInput${newProductIndex}">PRODUCTO ${newProductIndex}</label>
                <input type="text" class="form-control" id="productoInput${newProductIndex}" placeholder="Nombre del producto">
            </div>
            <div class="form-group">
                <label for="cantidad${newProductIndex}">Cantidad</label>
                <input type="number" class="form-control" id="cantidad${newProductIndex}" placeholder="Cantidad" step="any">
            </div>
            <div class="form-group">
                <label for="unidad${newProductIndex}">Unidad</label>
                <select class="form-control" id="unidad${newProductIndex}">
                    <option value="kg">Kilogramos (kg)</option>
                    <option value="g">Gramos (g)</option>
                    <option value="unidad">Unidad</option>
                </select>
            </div>
            <div class="form-group">
                <label for="precio${newProductIndex}">Precio</label>
                <input type="number" class="form-control" id="precio${newProductIndex}" placeholder="Precio" step="any">
            </div>
        </div>`;

    productosDiv.insertAdjacentHTML('beforeend', newProductHTML);
});

// Función para eliminar un producto (ahora elimina el bloque completo)
function removeProduct(productIndex) {
    var productDiv = document.getElementById('producto' + productIndex);
    if (productDiv) {
        productDiv.remove();
    }
}

// Función para calcular los costos
function calcularCostos() {
    var productosDiv = document.getElementById('productos');
    var productos = productosDiv.getElementsByClassName('form-group');
    var costoTotal = 0;
    var detalles = '';

    for (var i = 1; i <= productos.length / 4; i++) {
        var cantidad = parseFloat(document.getElementById('cantidad' + i).value.replace(',', '.'));
        var precio = parseFloat(document.getElementById('precio' + i).value.replace(',', '.'));
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

// Evento al enviar el formulario para calcular los costos
document.getElementById('costForm').addEventListener('submit', function (event) {
    event.preventDefault();
    calcularCostos();
});
// Función para agregar valor a la pantalla de la calculadora
function appendValue(value) {
    document.getElementById('calcDisplay').value += value;
}

// Función para calcular el resultado
function calculateResult() {
    var display = document.getElementById('calcDisplay');
    try {
        display.value = eval(display.value);  // Evaluar la expresión matemática
    } catch (e) {
        display.value = 'Error';  // Mostrar error si la expresión es inválida
    }
}

// Función para limpiar la pantalla de la calculadora
function clearDisplay() {
    document.getElementById('calcDisplay').value = '';
}

// Función para borrar el último carácter ingresado
function removeLastChar() {
    var display = document.getElementById('calcDisplay');
    display.value = display.value.slice(0, -1);  // Eliminar el último carácter
}
