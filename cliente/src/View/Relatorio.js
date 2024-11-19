import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import RelatorioTitle from '../Components/RelatorioView/RelatorioTitle'; // Mantém o nome correto
import RelatoriosTable from '../Components/RelatorioView/RelatoriosTable'; // Tabela de relatórios


function Relatorio() {

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        console.log('Scout ID no localStorage:', scoutId);
        // Você pode usar scoutId aqui para filtrar ou mostrar dados específicos
    }, []);

    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>
                    <RelatorioTitle /> {/* Exibe o título ou subtítulo */}
                    {/* Componente de Tabela com Relatórios */}
                    <RelatoriosTable />
                </div>
            </div>
        </div>
    );
}

export default Relatorio;
