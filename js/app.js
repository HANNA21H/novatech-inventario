let products = [];

let productId = 1;

const productForm = document.getElementById("productForm");
const productTableBody = document.getElementById("productTableBody");
const emptyMessage = document.getElementById("emptyMessage");

productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const stock = parseInt(document.getElementById("stock").value);

    const product = {
        id: productId,
        name: name,
        price: price,
        category: category,
        stock: stock
    };

    products.push(product);

    productId++;

    productForm.reset();

    renderProducts();
});


function renderProducts() {

    productTableBody.innerHTML = "";

    if (products.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }

    emptyMessage.style.display = "none";

    products.forEach(function (product) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>

                <button
                    class="action-button edit-button"
                    onclick="editProduct(${product.id})"
                >
                    Editar
                </button>

                <button
                    class="action-button delete-button"
                    onclick="deleteProduct(${product.id})"
                >
                    Eliminar
                </button>

            </td>
        `;

        productTableBody.appendChild(row);
    });
}


function editProduct(id) {

    const product = products.find(function (product) {
        return product.id === id;
    });

    if (!product) {
        return;
    }

    const newName = prompt("Nombre del producto:", product.name);

    if (newName === null) {
        return;
    }

    const newPrice = prompt("Precio:", product.price);

    if (newPrice === null) {
        return;
    }

    const newCategory = prompt(
        "Categoría:",
        product.category
    );

    if (newCategory === null) {
        return;
    }

    const newStock = prompt(
        "Stock:",
        product.stock
    );

    if (newStock === null) {
        return;
    }

    product.name = newName;
    product.price = parseFloat(newPrice);
    product.category = newCategory;
    product.stock = parseInt(newStock);

    renderProducts();
}


function deleteProduct(id) {

    const confirmed = confirm(
        "¿Está seguro de eliminar este producto?"
    );

    if (!confirmed) {
        return;
    }

    products = products.filter(function (product) {
        return product.id !== id;
    });

    renderProducts();
}


renderProducts();