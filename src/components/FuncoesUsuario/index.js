import { useState, useEffect } from "react";
import UserProfile from "../Profile";
import CriarUsuario from "../CriarUsuario";
import ListarUsuarios from "../ListarUsuarios/index";
import { UsuarioService } from "../../services/usuario";
// cria meu componente header

function Header() {
  const [usuarios, setUsuarios] = useState([]);
  const [atualizarUsuarios, setAtualizarUsuarios] = useState(false);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await UsuarioService.listar();
        setUsuarios(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsuario();
  }, [atualizarUsuarios]);

  const handleUsuarioCadastrado = () => {
    setAtualizarUsuarios(true);
  };

  return (
    <>
      <div className='container '>
        <div className='row'>
          <div className='col-10 offset-1 col-md-6'>
            <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link active'
                  id='pills-home-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-home'
                  type='button'
                  role='tab'
                  aria-controls='pills-home'
                  aria-selected='true'>
                  Adicionar
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link'
                  id='pills-profile-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-profile'
                  type='button'
                  role='tab'
                  aria-controls='pills-profile'
                  aria-selected='false'>
                  Registros
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link'
                  id='pills-contact-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-contact'
                  type='button'
                  role='tab'
                  aria-controls='pills-contact'
                  aria-selected='false'>
                  Perfil
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className='tab-content' id='pills-tabContent'>
          <div
            className='tab-pane fade show active'
            id='pills-home'
            role='tabpanel'
            aria-labelledby='pills-home-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
                <CriarUsuario onCreate={handleUsuarioCadastrado} />
              </div>
            </div>
          </div>
          <div
            className='tab-pane fade'
            id='pills-profile'
            role='tabpanel'
            aria-labelledby='pills-profile-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
                <ListarUsuarios usuarios={usuarios} />
              </div>
            </div>
          </div>
          <div
            className='tab-pane fade'
            id='pills-contact'
            role='tabpanel'
            aria-labelledby='pills-contact-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5'>
                <UserProfile id={5} />
              </div>
            </div>
          </div>
          <div
            className='tab-pane fade'
            id='pills-disabled'
            role='tabpanel'
            aria-labelledby='pills-disabled-tab'
            tabIndex='0'>
            ...
          </div>
        </div>
      </div>
    </>
  );
}

// exporta meu componente header
export default Header;