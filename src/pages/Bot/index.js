import React, { use, useEffect, useRef } from "react";
import { useState } from "react";
import logo from '../../assets/furia_whitelogo.png'

export default function Bot(){

    const[userInput, setUserInput] = useState('');
    const[chatHistory, setChatHistory] = useState([
        { from: 'bot', text: 'Eai, furioso(a)! Tudo na paz?'},
        {from: 'bot', text: 'Qual é a boa de hoje? Tem alguma dúvida, quer fazer um Quiz ou vamos bangar o modo FURIOSÍSSIMO?'}]);

    const[inputSent, setInputSent] = useState(false);

    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, [chatHistory])

    function wait(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    

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
                option: ['nao', 'não', 'obrigad', 'valeu', 'ok'],
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

        if(!userInput){
            alert('Opa! Não consigo ouvir o que você está dizendo, poderia tentar novamente?')
            return;
        }

        for(let o of options){
            if(o.option.some(op => userInput.toLowerCase().includes(op))){
                response = o.answer;
                if(o.link) link = o.link;
                    break;
                }
        }

        

        setInputSent(true);
        await wait(450);
        setInputSent(false);
        setUserInput('');

        setChatHistory(sentMessages);
        await wait(850);
        setChatHistory([...sentMessages, { from: 'bot', text: response, ...(link && { link }) }]);
    }


    return(
        <div className="container">
            <div className="box-title">
                <div className="title">
                    <img src={logo} className="logo"></img>
                    <h1>BOT</h1>
                </div>
            </div>

            <div className="box-chat">
                {chatHistory.map((mensagem, index) => (
                    <div 
                        key={index}
                        className={`message ${mensagem.from === 'bot' ? 'bot' : 'user'}`}
                    >
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
                <div ref={endOfMessagesRef} />
            </div>

            <div className="box-user" id={inputSent ? 'input-sent' : ''}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Digite o que se passa na sua mente...."
                    onKeyDown={(e) => {if (e.key === 'Enter'){handleSubmit()}}}
                />

                <button onClick={handleSubmit}><span className="material-symbols-outlined">send</span></button>

            </div>
            <div className="box-info">
                <strong>dúvida?</strong>
                <p>me pergunte algo, darei o meu máximo para ajudar</p>

                <strong>quiz?</strong>
                <p>vou lançar algumas perguntas, acha que consegue responder corretamente?</p>

                <strong>modo FURIOSÍSSIMO 🔥</strong>
                <p>você não está preparado para o que irá ver!</p>
            </div>
        </div>
    )
}