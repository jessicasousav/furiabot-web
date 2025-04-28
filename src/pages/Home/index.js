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
                <div className='home_botface'>
                    <img src={botface} alt='botface'/>
                </div>
                <div className='content_title'>
                    <h2>
                        Olá, guerreiro(a)!
                    </h2>
                    <h3>
                        Bem-vindo(a) ao nosso FURIAbot, um chat dinâmico onde você pode encontrar informações sobre nosso time.
                    </h3>
                </div>

                <div className='content_messages'>
                    <h4>
                        Mas não paramos por aí, se quiser apenas jogar um pouquinho, preparamos um pequeno quiz para você testar seus conhecimentos sobre esse time tão querido pelo Brasil!
                    </h4>
                    <Link to='/chat' className='content_link'>
                        Clique aqui e bora conversar um pouquinho!
                    </Link>
                    <p>Te espero lá viu, guerreiro?!</p>
                </div>
            </div>

            <footer>
                © 2025 FuriaBOT. Criado por Jéssica de Sousa Vieira para teste da FURIA ESPOST.
            </footer>
        </div>
    )
}