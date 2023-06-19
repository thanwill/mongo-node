import { useEffect, useState } from "react";
//import { ProdutosService } from "../../services/produtos.js";
import { CategoriaService } from "../../services/categoria.js";
import "./style.css";
export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    CategoriaService.listar().then(categorias => {
      setCategorias(categorias);
    });
  }, []);
  return (
    <>
      <div class='mb-3 card'>
        <div class='card-body'>
          <div class='flex-between-center row'>
            <div class='d-flex align-items-center mb-2 mb-sm-0 col-sm-auto'>
              <select class='form-select form-select-sm'>
                {categorias.map(categoria => {
                  return <option value={categoria.id}>{categoria.nome}</option>;
                })}
                <option value='9'>All</option>
              </select>
              <h6 class='mb-0 ms-2'>Filtre por categorias</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}