import React, { use, useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import logo from '../../assets/furia_whitelogo.png';

import '../../styles/furioso.css';
import '../../styles/bot.css';

export default function Bot(){

    const[showInstructions, setShowInstructions] = useState(false);
    const[isMobile, setIsMobile] = useState(false);

    const[userInput, setUserInput] = useState('');
    const[chatHistory, setChatHistory] = useState([
        { from: 'bot', text: 'Eai, furioso(a)! Tudo na paz?'},
        {from: 'bot', text: 'Qual é a boa de hoje? Tem alguma dúvida, quer fazer um Quiz ou vamos bangar o Modo Furioso?'}]);

    const[inputSent, setInputSent] = useState(false);

    const[quizActive, setQuizActive] = useState(false);
    const[currentQuestion, setCurrentQuestion] = useState(null);
    const[remainingQuestions, setRemainingQuestions] = useState([]);

    const[score, setScore] = useState(0);

    const [furiousMode, setFuriousMode] = useState(false);
    const [furiousSteps, setFuriousSteps] = useState(0);

    const endOfMessagesRef = useRef(null);

    // Focando chat sempre na última mensagem enviada
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, [chatHistory])

    // Verificando se o dispositivo é um celular
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 600 || window.innerHeight <= 600;
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
                option: ['oi', 'tudo bem', 'ola', 'olá'],
                answer: 'Tudo bem, guerreiro(a)? Espero que seu dia esteja tão bom quanto o meu! Como posso te ajudar hoje?',
            },
            {
                option: ['paz', 'estou bem'],
                answer: 'Que bom que está na paz de um jogo vencido! Em que posso te ajudar agora?',
            },
            {
                option: ['beleza', 'ok'],
                answer: 'Show! Precisa de ajuda com mais alguma coisa, guerreiro(a)?'
            },
            {
                option: ['jog', 'quando', 'onde', 'dropa'],
                answer: 'Quer saber sobre os jogos e jogadores da FURIA? Dá uma olhada aqui: ',
                link: 'https://draft5.gg/equipe/330-FURIA',
            },
            {
                option: ['noticia', 'notícia', 'informa'],
                answer: 'Quer se manter informado sobre tudo da FURIA? Confere aqui:',
                link: 'https://themove.gg/esports/cs',
            },
            {
                option: ['duvida', 'dúvida', 'pergunta', 'sim', 'ajuda', 'furia'],
                answer: 'Manda aí sua dúvida! Vou tentar ajudar da melhor forma possível. Se quiser saber mais sobre os jogos ou jogadores, é só mandar um "dropa".',
            },
            {
                option: ['nao', 'não', 'obrigad', 'valeu', 'parar', 'nada', 'tchau'],
                answer: 'Valeu por trocar essa ideia comigo! Qualquer coisa, só chamar!',
            },
            {
                option: ['roupa', 'vest', 'camis', 'moda', 'merchandise'],
                answer: 'A linha de moda da FURIA tá simplesmente insana! Confere lá:',
                link: 'https://www.furia.gg',
            },
            {
                option: ['arm'],
                answer: 'Falando de CS... tem muita arma braba, mas a AK-47, M4A4/M4A1-S e AWP são as queridinhas dos players!'
            },
            {
                option: ['quiz'],
                answer: 'Fechado! Bora pro quiz! Serão 3 perguntas sobre a FURIA. Se quiser parar, é só dizer "parar". Preparado(a)?',
            },
            {
                option: ['contato', 'whats', 'wpp'],
                answer: 'Se quiser falar com a FURIA ou saber mais, manda um oi no WhatsApp! Te espero lá, guerreiro(a)!',
                link: 'https://wa.me/5511993404466'
            },
            {
                option: ['furios'],
                answer: 'Você fez a melhor escolha! 🔥 O Modo Furioso foi ativado! Quer voltar ao normal? Só mandar "desativar", beleza?'
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

        const furious = [
            'VAMO FURIAAAAAA!',
            'Jogar bonito é fácil... quero ver é jogar com FURIAAAA!',
            'Na FURIA não existe adversário. Só presa.',
            'Smoke, flash... e quando você menos espera, uma fera te encontra!',
            'Não é questão de sorte, é questão de tática!',
            'Um time joga. A FURIA deixa legado. Somos legião!'
        ]


        // Alerta caso o usuário envie o campo de digitação vazio
        if(!userInput){
            alert('Opa! Parece que você não digitou nada. Tenta de novo aí!')
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

                else if(o.option.includes('furios')){
                    setFuriousMode(true);
                    setFuriousSteps(1);
                    setUserInput('');
                    
                    const chosenFuriousMessage = furious[Math.floor(Math.random() * furious.length)];

                    const updateMessage = [...sentMessages, {from: 'bot', text: chosenFuriousMessage, isFurious: true}];

                    setChatHistory(updateMessage);

                    await wait(500);

                    setChatHistory([...updateMessage, {from: 'bot', text: response}]);

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
                { from: 'bot', text: 'Tranquilo, o quiz foi interrompido! Se quiser jogar de novo, é só mandar um "quiz".'}
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

        if(furiousMode && userInput.toLowerCase().includes('desativar')){
            setFuriousMode(false);
            setFuriousSteps(0);
            setChatHistory([...chatHistory,
                {from: 'user', text: userInput},
                {from: 'bot', text: 'Ok, Modo Furioso desativado! Se quiser ativar de novo, é só mandar um "furioso"'}
            ]);
            setUserInput('');
            return;
        }

        
        setInputSent(true);
        await wait(450);
        setInputSent(false);
        setUserInput('');

        let updatedMessages = [...sentMessages];

        if(furiousMode){

            const chosenFuriousMessage = furious[Math.floor(Math.random() * furious.length)];
            updatedMessages.push({from: 'bot', text: chosenFuriousMessage, isFurious: true});

            setFuriousSteps(prev => prev + 1);

            setChatHistory(updatedMessages);
            await wait(500);

            updatedMessages.push({from: 'bot', text: response, ...(link && { link }) });
            setChatHistory([...updatedMessages])
        } else {
            updatedMessages.push({from: 'bot', text: response, ...(link && { link }) });
            setChatHistory(updatedMessages)
        }
    }



    return(
        <div className={`container ${furiousMode ? 'furioso' : ''}`}>
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
                        className={`message 
                            ${mensagem.from === 'bot' ? 'bot' : 'user'} ${mensagem.status === 'success' ? 'success' : ''} 
                            ${mensagem.status === 'error' ? 'error' : ''}
                            ${mensagem.isFurious ? 'fanatic' : ''}
                            `} 
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
                    placeholder="Digite o que se passa na sua mente..."
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

                <strong>Modo Furioso 🔥</strong>
                <p>você não está preparado para o que irá ver!</p>
            </div>
            )}
            <div className='box-back'>
                <Link className='box-link' to='/'><span class="material-symbols-outlined">arrow_back</span></Link>
            </div>

            <footer>
                <div>© 2025 FuriaBOT. Criado por <a href="https://linkedin.com/in/jessica-sousa-vieira" target="blank"> Jéssica de Sousa Vieira </a> para teste da FURIA ESPORTS.</div>
            </footer>
        </div>
    )
}