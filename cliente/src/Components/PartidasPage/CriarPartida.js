import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import PartidasTitleCriar from './PartidasTitleCriar';
import "../../Style/AtletasView/CriarPartida.css";  // Referência ao CSS

function CriarPartida() {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [timeMandanteNome, setTimeMandanteNome] = useState('');
    const [timeVisitanteNome, setTimeVisitanteNome] = useState('');
    const [jogadoresNomes, setJogadoresNomes] = useState([]);  
    const [scoutsNomes, setScoutsNomes] = useState([]);  // Lista de nomes de scouts
    const [scoutsIds, setScoutsIds] = useState([]);  // IDs de scouts selecionados
    const [times, setTimes] = useState([]);  
    const [jogadores, setJogadores] = useState([]);  
    const [scouts, setScouts] = useState([]);  // Lista de scouts
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jogadoresDisponiveis, setJogadoresDisponiveis] = useState([]); 
    const navigate = useNavigate();

    // Função para buscar os times
    useEffect(() => {
        axios.get('http://localhost:3000/times')  
            .then((response) => {
                setTimes(response.data);  
            })
            .catch((error) => {
                console.error('Erro ao buscar os times', error);
                setError('Erro ao buscar os times.');
            });
    }, []);

    // Função para buscar os jogadores
    useEffect(() => {
        axios.get('http://localhost:3000/atletas')  
            .then((response) => {
                setJogadores(response.data);  
            })
            .catch((error) => {
                console.error('Erro ao buscar os jogadores', error);
                setError('Erro ao buscar os jogadores.');
            });
    }, []);

    // Função para buscar os scouts
    useEffect(() => {
        axios.get('http://localhost:3000/utilizadores')  // Endpoint para scouts
            .then((response) => {
                setScouts(response.data);  // Atualiza o estado com os scouts recebidos
            })
            .catch((error) => {
                console.error('Erro ao buscar os scouts', error);
                setError('Erro ao buscar os scouts.');
            });
    }, []);

    // Função para encontrar o ID do scout a partir do nome
    const getScoutIdByNome = (nome) => {
        const scout = scouts.find(scout => scout.nome.toLowerCase() === nome.toLowerCase());
        return scout ? scout.id : null;
    };

    // Função para encontrar o ID do time a partir do nome
    const getTimeIdByNome = (nome) => {
        const time = times.find(time => time.nome.toLowerCase() === nome.toLowerCase());
        return time ? time.id : null;
    };

    // Função para filtrar jogadores pelo time
    const getJogadoresPorTime = (timeId) => {
        return jogadores.filter(jogador => jogador.timeId === timeId); 
    };

    // Função para encontrar o ID do jogador a partir do nome
    const getJogadorIdByNome = (nome) => {
        const jogador = jogadores.find(jogador => jogador.nome.toLowerCase() === nome.toLowerCase());
        return jogador ? jogador.id : null;
    };

    const handleTimeMandanteChange = (e) => {
        const nomeTimeMandante = e.target.value;
        setTimeMandanteNome(nomeTimeMandante);

        // Encontrar o ID do time mandante e filtrar jogadores
        const timeMandanteId = getTimeIdByNome(nomeTimeMandante);
        if (timeMandanteId) {
            const jogadoresDoTimeMandante = getJogadoresPorTime(timeMandanteId);
            setJogadoresDisponiveis(jogadoresDoTimeMandante); 
        } else {
            setJogadoresDisponiveis([]); // Limpa os jogadores se o time não for encontrado
        }
    };

    // Função para lidar com a seleção de jogadores
    const handleJogadorSelect = (nome) => {
        if (jogadoresNomes.includes(nome)) {
            setJogadoresNomes(jogadoresNomes.filter(jogador => jogador !== nome));
        } else {
            setJogadoresNomes([...jogadoresNomes, nome]);
        }
    };

    // Função para lidar com a seleção de scouts
    const handleScoutSelect = (nome) => {
        if (scoutsNomes.includes(nome)) {
            setScoutsNomes(scoutsNomes.filter(scout => scout !== nome));
        } else {
            setScoutsNomes([...scoutsNomes, nome]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data || !hora || !local || !timeMandanteNome || !jogadoresNomes.length) {
            Swal.fire('Erro!', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        const timeMandanteId = getTimeIdByNome(timeMandanteNome);
        const timeVisitanteId = timeVisitanteNome ? getTimeIdByNome(timeVisitanteNome) : null;

        if (!timeMandanteId) {
            Swal.fire('Erro!', 'Time mandante não encontrado. Verifique o nome digitado.', 'error');
            return;
        }

        const jogadoresIds = jogadoresNomes.map(nome => getJogadorIdByNome(nome)).filter(id => id !== null);
        const scoutsIds = scoutsNomes.map(nome => getScoutIdByNome(nome)).filter(id => id !== null);

        if (jogadoresIds.length === 0) {
            Swal.fire('Erro!', 'Nenhum jogador encontrado. Verifique os nomes digitados.', 'error');
            return;
        }

        setLoading(true);

        axios
            .post('http://localhost:3000/partidas', {
                data,
                hora,
                local,
                timeMandanteId,
                timeVisitanteId,
                jogadoresIds,
                scoutsIds
            })
            .then((response) => {
                console.log('Partida criada com sucesso!', response);
                Swal.fire('Sucesso!', 'A partida foi criada com sucesso!', 'success');
                navigate('/partidas');
            })
            .catch((error) => {
                setLoading(false);
                setError('Erro ao criar a partida.');

                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: error.response.data.error || 'Dados inválidos',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: error.response ? error.response.data.error : 'Não foi possível criar a partida.',
                    });
                }
            });
    };

    return (
        <div className="criar-partidaPJ">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <PartidasTitleCriar />
                    <section className="sectionAD clube-infoAD">
                        <form className="formularioPj" onSubmit={handleSubmit}>
                            <div>
                                <label>Data:</label>
                                <input 
                                    className="inputPJ" 
                                    type="date" 
                                    value={data} 
                                    onChange={(e) => setData(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Hora:</label>
                                <input 
                                    className="inputPJ" 
                                    type="time" 
                                    value={hora} 
                                    onChange={(e) => setHora(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Local:</label>
                                <input 
                                    className="inputPJ" 
                                    type="text" 
                                    value={local} 
                                    onChange={(e) => setLocal(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Time Mandante:</label>
                                <input
                                    className="inputPJ"
                                    type="text"
                                    placeholder="Digite o nome do time mandante"
                                    value={timeMandanteNome}
                                    onChange={handleTimeMandanteChange}
                                />
                            </div>
                            <div>
                                <label>Time Visitante (opcional):</label>
                                <input
                                    className="inputPJ"
                                    type="text"
                                    placeholder="Digite o nome do time visitante (opcional)"
                                    value={timeVisitanteNome}
                                    onChange={(e) => setTimeVisitanteNome(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Jogadores (nomes separados por vírgula):</label>
                                {jogadoresDisponiveis.map(jogador => (
                                    <div key={jogador.id}>
                                        <input 
                                            type="checkbox"
                                            id={jogador.id}
                                            value={jogador.nome}
                                            checked={jogadoresNomes.includes(jogador.nome)}
                                            onChange={() => handleJogadorSelect(jogador.nome)}
                                        />
                                        <label htmlFor={jogador.id}>{jogador.nome}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label>Scouts (nomes separados por vírgula):</label>
                                <input
                                    className="inputPJ"
                                    type="text"
                                    placeholder="Digite os nomes dos scouts separados por vírgula"
                                    value={scoutsNomes.join(', ')}
                                    onChange={(e) => setScoutsNomes(e.target.value.split(',').map(nome => nome.trim()))}
                                />
                            </div>

                            <div className="buttons-container">
                                <button 
                                    className="botao-submitPJ" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? 'Criando...' : 'Criar Partida'}
                                </button>
                                <button 
                                    className="back-buttonPJ" 
                                    onClick={() => navigate('/partidas')}
                                >
                                    Voltar
                                </button>
                            </div>
                        </form>
                    </section>
                    <div className="button-containerPJ"></div>
                </div>
            </div>
        </div>
    );
}

export default CriarPartida;
