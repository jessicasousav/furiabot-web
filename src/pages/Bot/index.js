import React, { use } from "react";
import { useState } from "react";

export default function Bot(){

    const[userInput, setUserInput] = useState('');
    const[chatHistory, setChatHistory] = useState([
        { from: 'bot', text: 'Eai, furioso(a)! Tudo na paz?'},
        {from: 'bot', text: 'Qual é a boa de hoje? Alguma dúvida, um Quiz ou vamos bangar o modo FURIOSÍSSIMO?'}]);

    async function handleSubmit(){

        const sentMessages = [... chatHistory, {from: 'user', text: userInput }]

        const options = [
            {
                option: ['oi', 'tudo bem'],
                answer: 'Tudo bem, furioso(a)? Espero que esteja tendo um bom dia como eu! Em que posso te ajudar hoje?',
            },
            {
                option: ['paz', 'estou bem'],
                answer: 'Que bom que está na paz de um jogo vencido! Em que posso te ajudar hoje?',
            },
            {
                option: ['jog', 'quando', 'onde', 'dropa'],
                answer: 'Para encontrar informações de jogos e jogadores: ',
                link: 'https://draft5.gg/equipe/330-FURIA',
            },
            {
                option: ['duvida', 'pergunta', 'sim'],
                answer: 'Me fala qual a sua dúvida, estarei tentando te ajudar da melhor forma que consigo. Se quer saber mais sobre os jogos ou jogadores, me manda um "dropa".',
            },
            {
                option: ['nao', 'não', 'obrigad', 'valeu'],
                answer: 'Valeu por passar aqui pra falar comigo, qualquer outra dúvida é so chamar!',
            },
            {
                option: ['roupa', 'vest', 'camis', 'moda', 'merchandise'],
                answer: 'A linha de moda da FURIA é lindissima, vai lá dar uma conferida: ',
                link: 'https://www.furia.gg',
            }
        ];

        let response = 'Desculpe, não entendi o que você quis dizer. Deseja tentar novamente?';
        let link = '';

        for(let o of options){
            if(o.option.some(op => userInput.toLowerCase().includes(op))){
                response = o.answer;
                if(o.link) link = o.link;
                    break;
                }
        }

        setChatHistory([...sentMessages, { from: 'bot', text: response, ...(link && { link }) }]);
        setUserInput('');
    }


    return(
        <div className="container">
            <div className="box-title">
                <h1>FuriaBot Web</h1>
            </div>

            <div className="box-chat">
                {chatHistory.map((mensagem, index) => (
                    <div key={index}>
                        <strong>{mensagem.from === 'bot' ? 'FuriaBOT: ' : 'VOCÊ: '}</strong>
                        {mensagem.link ? (
                            <>
                                {mensagem.text}
                                <a
                                href={mensagem.link}
                                target="blank">
                                    clique aqui
                                </a>
                            </>
                        ) : (
                            mensagem.text
                        )}
                    </div>
                ))}
            </div>

            <div className="box-user">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Digite o que se passa na sua mente...."

                    onKeyDown={(e) => {if (e.key === 'Enter'){handleSubmit()}}}
                />

                <button onClick={handleSubmit}>Enviar</button>
            </div>
        </div>
    )
}