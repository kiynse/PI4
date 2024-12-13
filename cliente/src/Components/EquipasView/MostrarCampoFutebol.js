import React from "react";
import Jogador from "./Jogador";

function CampoFutebol({ positions, formacao }) {
    // Definindo todas as posições de titulares e reservas conforme a formação
    const formationData = {
        "4-3-3": [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Meio Campista", style: { top: '53.5%', left: '45%' } },
            { pos: "pos7", title: "Meio Campista", style: { top: '66%', left: '37%' } },
            { pos: "pos8", title: "Meio Campista", style: { top: '40%', left: '37%' } },
            { pos: "pos9", title: "Atacante", style: { top: '35%', left: '52%' } },
            { pos: "pos10", title: "Atacante", style: { top: '75%', left: '52%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '56%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Meio Campista", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "4-4-2": [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Meio Campista", style: { top: '62.5%', left: '37%' } },
            { pos: "pos7", title: "Meio Campista", style: { top: '77%', left: '43%' } },
            { pos: "pos8", title: "Meio Campista", style: { top: '45%', left: '37%' } },
            { pos: "pos9", title: "Meio Campista", style: { top: '30%', left: '43%' } },
            { pos: "pos10", title: "Atacante", style: { top: '40%', left: '56%' } },
            { pos: "pos11", title: "Atacante", style: { top: '65%', left: '56%' } },
            // Reservas
            { pos: "pos17", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos12", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos13", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos14", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos15", title: "Meio Campista", style: { top: '69%', left: '80%' } },
            { pos: "pos16", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "4-2-3-1"
        : [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Meio Campista", style: { top: '53.5%', left: '48%' } },
            { pos: "pos7", title: "Meio Campista", style: { top: '63%', left: '37%' } },
            { pos: "pos8", title: "Meio Campista", style: { top: '43%', left: '37%' } },
            { pos: "pos9", title: "Meio Campista",  style: { top: '35%', left: '48%' } },
            { pos: "pos10", title: "Meio Campista", style: { top: '75%', left: '48%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '59%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Meio Campista", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
    };

    const currentFormationPositions = formationData[formacao] || [];

    return (
        <div className="campo-futebol">
            {currentFormationPositions.map(position => (
                <Jogador
                    key={position.pos}
                    position={position}
                    nome={positions[position.pos] ? positions[position.pos].nome : ""} // Nome do jogador
                />
            ))}
        </div>
    );
}

export default CampoFutebol;
