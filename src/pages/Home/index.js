import { Link } from 'react-router-dom';

import logo from '../../assets/furia_whitelogo.png';
import botface from '../../assets/furia_botface.png'
import '../../styles/home.css';

export default function Home(){
    return(
        <div className="home-container">
            <div className='home-box-title'>
                <div className='home-title'>
                    <img src={logo} alt='logo furia'/>
                    <h1>BOT</h1>
                </div>
            </div>

            <div className='home-content'>
                <div className='home-botface'>
                    <img src={botface} alt='botface'/>
                </div>
                <div className='content-title'>
                    <div className='content-hi'>
                        <h2>
                            Olá, guerreiro(a)!
                        </h2>
                    </div>
                    <h3>
                        Sou o FuriaBOT, um chatbot dinâmico da FURIA onde você pode encontrar informações sobre o nosso time.
                    </h3>
                </div>

                <div className='content-messages'>
                    <h4>
                        Mas não paramos por aí, se quiser apenas jogar um pouquinho, preparamos um pequeno quiz para você testar seus conhecimentos sobre esse time tão querido pelo Brasil!
                    </h4>
                    <Link to='/chat' className='content-link'>
                        Clique aqui e bora conversar um pouquinho!
                    </Link>
                    <p>Te espero lá viu, guerreiro(a)?!</p>
                </div>
            </div>

            <footer>
                <div>© 2025 FuriaBOT. Criado por <a href="https://linkedin.com/in/jessica-sousa-vieira" target="blank"> Jéssica de Sousa Vieira </a> para teste da FURIA ESPORTS.</div>
            </footer>
        </div>
    )
}