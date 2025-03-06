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
        display.value = eval(display.value); // Usamos eval() para calcular el resultado
    } catch (e) {
        display.value = 'Error'; // En caso de un error, mostramos "Error"
    }
}

// Función para calcular los costos de los productos
function calcularCostos() {
    var productosDiv = document.getElementById('productos');
    var productos = productosDiv.getElementsByClassName('form-group');
    var costoTotal = 0;
    
    for (var i = 1; i <= productos.length / 4; i++) {
        var producto = document.getElementById('producto' + i).value;
        var cantidad = parseFloat(document.getElementById('cantidad' + i).value);
        var precio = parseFloat(document.getElementById('precio' + i).value);
        var unidad = document.getElementById('unidad' + i).value;

        // Aseguramos que la cantidad y el precio sean válidos
        if (!isNaN(cantidad) && !isNaN(precio) && cantidad > 0 && precio > 0) {
            var costoProducto = cantidad * precio;
            if (unidad === 'g') {
                // Si la unidad es gramos, convertimos a kilogramos para uniformidad
                costoProducto = (cantidad / 1000) * precio; 
            }

            costoTotal += costoProducto;
        } else {
            alert("Por favor, ingresa valores válidos para todos los productos.");
            return;
        }
    }

    // Mostrar el resultado
    document.getElementById('costosResultados').innerHTML = `
        <p><strong>Costo Total:</strong> $${costoTotal.toFixed(2)}</p>
    `;
}

// Agregar productos dinámicamente
document.getElementById('agregarProducto').addEventListener('click', function() {
    var productosDiv = document.getElementById('productos');
    var newProductIndex = productosDiv.getElementsByClassName('form-group').length / 4 + 1; // Contar productos existentes
    var newProductHTML = `
        <div class="form-group">
            <label for="producto${newProductIndex}">PRODUCTO ${newProductIndex}</label>
            <input type="text" class="form-control" id="producto${newProductIndex}" placeholder="Nombre del producto">
        </div>
        <div class="form-group">
            <label for="cantidad${newProductIndex}">Cantidad</label>
            <input type="number" class="form-control" id="cantidad${newProductIndex}" placeholder="Cantidad">
        </div>
        <div class="form-group">
            <label for="precio${newProductIndex}">Precio</label>
            <input type="number" class="form-control" id="precio${newProductIndex}" placeholder="Precio por unidad">
        </div>
        <div class="form-group">
            <label for="unidad${newProductIndex}">Unidad</label>
            <select class="form-control" id="unidad${newProductIndex}">
                <option value="kg">Kilogramos (kg)</option>
                <option value="g">Gramos (g)</option>
            </select>
        </div>
    `;
    productosDiv.innerHTML += newProductHTML; // Agregar el nuevo producto
});

// Evento para el botón "Calcular"
document.getElementById('costForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    calcularCostos(); // Llamar a la función de cálculo de costos
});
