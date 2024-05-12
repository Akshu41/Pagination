import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=100`);
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
        console.log(products)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log("page updated");
  }, [pageNumber]);


   const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== pageNumber) {
      setPageNumber(selectedPage)
    }
  }


  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mt-3">
        {products.slice(pageNumber *10 -10, pageNumber * 10).map(product => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card">
              <div className="card-body">
                <img src={product.images[0]}/>
                <h5 className="card-title">{product.title}</h5>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination justify-content-center d-flex">
        <button className={pageNumber === 1 ? "btn btn-primary d-none" : "btn btn-primary"}  onClick={goToPrevPage} >
          Prev
        </button>

       {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={pageNumber === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}



        
        <button className={pageNumber === totalPages ? "btn btn-primary d-none" : "btn btn-primary"} onClick={goToNextPage} >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
