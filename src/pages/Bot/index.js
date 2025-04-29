import React, { use, useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import logo from '../../assets/furia_whitelogo.png';
import botface from '../../assets/furia_botface.png';
import '../../styles/bot.css';

export default function Bot(){

    const[showInstructions, setShowInstructions] = useState(false);
    const[isMobile, setIsMobile] = useState(false);

    const[userInput, setUserInput] = useState('');
    const[chatHistory, setChatHistory] = useState([
        { from: 'bot', text: 'Eai, furioso(a)! Tudo na paz?'},
        {from: 'bot', text: 'Qual é a boa de hoje? Tem alguma dúvida, quer fazer um Quiz ou vamos bangar o modo FURIOSÍSSIMO?'}]);

    const[inputSent, setInputSent] = useState(false);

    const[quizActive, setQuizActive] = useState(false);
    const[currentQuestion, setCurrentQuestion] = useState(null);
    const[remainingQuestions, setRemainingQuestions] = useState([]);

    const[score, setScore] = useState(0);

    const endOfMessagesRef = useRef(null);

    // Focando chat sempre na última mensagem enviada
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, [chatHistory])

    // Verificando se o dispositivo é um celular
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 600;
            setIsMobile(mobile);
            setShowInstructions(!mobile);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleInstructions = () => {
        if(isMobile){
            setShowInstructions((prev) => !prev)
        }
    }

    // Função de esperar(tempo)
    function wait(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    

    async function handleSubmit(){

        const sentMessages = [... chatHistory, {from: 'user', text: userInput }]

        let response = 'Desculpe, não entendi o que você quis dizer. Deseja tentar novamente?';
        let link = '';

        // Comandos aceitos pelo chatbot
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
                option: ['nao', 'não', 'obrigad', 'valeu', 'ok', 'parar', 'nada'],
                answer: 'Valeu por passar aqui pra falar comigo, qualquer outra dúvida é so chamar!',
            },
            {
                option: ['roupa', 'vest', 'camis', 'moda', 'merchandise'],
                answer: 'A linha de moda da FURIA é lindissima, vai lá dar uma conferida: ',
                link: 'https://www.furia.gg',
            },
            {
                option: ['arm'],
                answer: 'Olha, falando de CS... tem muita arma ali que pode te fazer dar o seu nome, mas a "AK-47", as "M4A4/M4A1-S" e a "AWP" tem o coração de muitos jogadores!'
            },
            {
                option: ['quiz'],
                answer: 'Beleza! Vamos para o quiz, espero que esteja preparado(a)! Serão 3 perguntas e caso queira parar, é só dizer "parar".',
            },
            {
                option: ['contato', 'whats', 'wpp'],
                answer: 'Opa! Se quiser entrar em contato ou saber mais sobre a FURIA, é só dar um oi lá no WhatsApp! Te espero lá ein guerreiro(a)!',
                link: 'https://wa.me/5511993404466'
            },
        ];

        // Perguntas e Respostas do Quiz
        const questionsQuiz = [
            {
                id: 1,
                question: 'Qual é o nome do atual capitão da FURIA?',
                answer: ['fallen', 'falen']
            },
            {
                id: 2,
                question: 'Sabe me dizer um game jogado pela FURIA?',
                answer: ['cs', 'counter', 'strike', 'rocket', 'league', 'valorant', 'rainbow', 'apex', 'futebol de 7', 'vava'],
            },
            {
                id: 3,
                question: 'Qual é o símbolo da FURIA? Dica: É um animal.',
                answer: ['pantera']
            },
            {
                id: 4,
                question: 'Me fala o nome de um jogador da FURIA',
                answer: ['molodoy', 'yekindar', 'fallen', 'falen', 'kscerato', 'yuurih', 'skullz', 'chelo']
            }
        ]


        // Alerta caso o usuário envie o campo de digitação vazio
        if(!userInput){
            alert('Opa! Não consigo ouvir o que você está dizendo, poderia tentar novamente?')
            return;
        }

        // Percorrendo as opções de comandos
        for(let o of options){
            // se encontrar em alguma opção, algo digitado pelo usuário, responde com a resposta daquela opção
            if(o.option.some(op => userInput.toLowerCase().includes(op))){
                response = o.answer;

                // se o comando, tiver um link, a variável link recebe o valor do link dessa opção
                if(o.link) link = o.link;

                // se o usuário digitar "quiz", inicia o quiz
                if(o.option.includes('quiz')){
                    // sorteando aleatóriamente as 3 primeiras perguntas
                    const shuffleQuiz = [...questionsQuiz].sort(() => Math.random() - 0.5);
                    const chosenQuestions = shuffleQuiz.slice(0, 3);
                    const firstQuestion = chosenQuestions[0].question

                    // guardando as perguntas restantes e selecionando a primeira
                    setRemainingQuestions(chosenQuestions.slice(1));
                    setCurrentQuestion(chosenQuestions[0]);
                    setQuizActive(true);

                    setInputSent(true);
                    await wait(450);
                    setInputSent(false);
                    setUserInput('');

                    // introduzindo o quiz para o usuário
                    const introQuiz = [...sentMessages, { from: 'bot', text: response }];
                    setChatHistory(introQuiz);

                    await wait(2000);

                    // contagem regressiva para inicio do quiz
                    let countdownMessages = [...introQuiz]
                    const countdown = ['3...', '2...', '1...']

                    for(let c of countdown){
                        countdownMessages = [...countdownMessages, {from: 'bot', text: c}];
                        setChatHistory(countdownMessages);
                        await wait(1000);
                    }

                    // enviando primeira pergunta ao usuário após fim da contagem regressiva
                    setChatHistory([...countdownMessages, { from: 'bot', text: firstQuestion }])
                    return;
                    
                }
                break;
            }
        }

        // interrupção do quiz pelo usuário
        if(quizActive && userInput.toLowerCase().includes('para')){
            setQuizActive(false);
            setCurrentQuestion(null);
            setRemainingQuestions([]);
            setScore(0);

            // mensagem para avisar ao usuário que o quiz foi interrompido com sucesso
            const stopQuiz = [...chatHistory,
                { from: 'user', text: userInput},
                { from: 'bot', text: 'Beleza, quiz interrompido! Caso queira fazer novamente, é só dizer "quiz".'}
            ]
            setUserInput('');
            setChatHistory(stopQuiz);
            return;
        }

        // se o quiz estiver acionado
        if(quizActive && currentQuestion){
            // percorrendo as respostas para saber se o usuário respondeu corretamente
            const userAnswer = userInput.toLowerCase();
            const correct = currentQuestion.answer.some(a => userAnswer.includes(a));
            
            let feedback = correct ? 'Acertou' : 'Errou';

            // criando pontuação de acertos
            if(correct){
                setScore(prevScore => prevScore + 1);
            }

            setUserInput('');

            // status será utilizado posteriormente no código para nomenclatura de classe e estilização visual
            const feedbackMessage = {
                from: 'bot',
                text: feedback,
                status: correct ? 'success' : 'error'
            };

            const updatedQuiz = [...sentMessages, feedbackMessage];

            // se ainda tiver perguntas na lista das 3 perguntas selecionadas
            if(remainingQuestions.length > 0){
                // a proxima pergunta será a que está agora na posição 0
                const nextQuestion = remainingQuestions[0];
                setCurrentQuestion(nextQuestion);
                setRemainingQuestions(remainingQuestions.slice(1));

                setChatHistory(updatedQuiz);
                await wait(1000);
                setChatHistory([...updatedQuiz, { from: 'bot', text: nextQuestion.question}])

            // se não tiver mais perguntas na lista, finaliza-se o quiz
            } else {
                setQuizActive(false);
                setCurrentQuestion(null);
                setRemainingQuestions([]);

                const finalScore = correct ? score + 1 : score

                const finalQuiz = [
                    ...updatedQuiz,
                    { from: 'bot', text: `Acabaram as perguntas! Você fez ${finalScore} ponto(s) de 3. Valeu por jogar comigo.`}
                ];

                
                setChatHistory(finalQuiz);
                await wait(1500);
                setChatHistory([...finalQuiz, { from: 'bot', text: 'Parabéns! O que mais gostaria de fazer agora?'}]);
                
                setScore(0);
            }
            return;
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
                        className={`message ${mensagem.from === 'bot' ? 'bot' : 'user'} ${mensagem.status === 'success' ? 'success' : ''} ${mensagem.status === 'error' ? 'error' : ''}`} 
                    >
                        <strong>{mensagem.from === 'bot' ? 'FuriaBOT: ' : 'VOCÊ: '}</strong>
                        {mensagem.link ? (
                            <>
                                {mensagem.text}
                                <div>
                                    <a
                                    href={mensagem.link}
                                    target="blank">
                                        clique aqui
                                    </a>
                                </div>
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
            {isMobile && (
                <button className="btn-help"><span class="material-symbols-outlined" id="help" onClick={toggleInstructions}>help</span></button>
            )}

            {showInstructions && (
                <div className="box-info" id="helpItens">
                <strong>dúvida?</strong>
                <p>me pergunte algo, darei o meu máximo para ajudar</p>

                <strong>quiz?</strong>
                <p>vou lançar algumas perguntas, acha que consegue responder corretamente?</p>

                <strong>modo FURIOSÍSSIMO 🔥</strong>
                <p>você não está preparado para o que irá ver!</p>
            </div>
            )}
            <div className='box-back'>
                <Link className='box-link' to='/'><span class="material-symbols-outlined">arrow_back</span></Link>
            </div>

            <footer>
                © 2025 FuriaBOT. Criado por Jéssica de Sousa Vieira para teste da FURIA ESPOST.
            </footer>
        </div>
    )
}