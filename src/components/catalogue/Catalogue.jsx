import React, { useState } from "react";

const products = [
    { id: 1, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 2, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 3, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 4, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 5, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 6, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 7, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 8, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 9, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 10, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 11, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 12, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 13, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 14, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 15, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 16, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 17, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 18, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 20, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 21, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 22, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 23, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },
    { id: 24, name: "ACS255-03U-17A0-6", description: "ABB", price: "1,850.00", image: "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg" },

];

const productsPerPage = 20; // 5 rows * 4 products per row = 20 produits

const Catalogue = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="container mt-5 pt-5 flex-grow-1">
                <div className="row">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 border-1 shadow-lg">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <div className="mt-auto">
                                        <p className="card-text fw-bold">{product.price}</p>
                                        <button className="btn btn-primary w-100">Ajouter au panier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination toujours en bas */}
            <nav className="mt-auto">
                <ul className="pagination justify-content-center mb-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Catalogue;
