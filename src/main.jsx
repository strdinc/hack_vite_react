import React from 'react';
import { createRoot } from 'react-dom/client';
import MetaBalls from './components/MetaBalls';
import SpotlightCard from './components/SpotlightCard';
import CircularText from './components/CircularText';

import './scripts/GradientButtons.js';
import './scripts/faq.js';
import './scripts/forms_buttons.js';
import './scripts/menuButton.js';
//import './scripts/birthday.js';
import '../participation_form.js';

import './style.css';

import 'normalize.css';

import VKlogo from './vk_logo.svg';
import IDigitlogo from './idigit_logo4partners.svg';
import Internetlogo from './internet.svg';
import KemSUlogo from './KemSU_logo.svg';
import UMPKemSUlogo from './UMPKemSU.svg';

const container_metaballs = document.getElementById('metaballs-root');
const metaballs = createRoot(container_metaballs);

metaballs.render(
    <MetaBalls
        color="#181719"
        cursorBallColor="#181719"
        cursorBallSize={2}
        ballCount={25}
        animationSize={30}
        enableMouseInteraction={false}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1.3}
        speed={0.7}
    />
);

const container_cardID = document.getElementById('cardID');
const cardID = createRoot(container_cardID);

cardID.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 73, 176, 0.6)">
        <img className="ID_logo_partner" src={IDigitlogo} alt="id logo"/>
        <div className="IDCard_title card_title">Институт цифры</div>
        <div className="IDCard_text card_text">
            создан в 2020 году на базе Кемеровского
            государственного университета.<br/>Институт цифры
            сегодня является лидером по вопросам цифровизации Кузбасса
        </div>
        <div className="hrefs">
            <a className="vk_link" href="https://vk.com/digital_kemsu"><img className="vk_link_img" src={VKlogo} /></a>
        </div>
    </SpotlightCard>
);

const container_CircularText = document.getElementById('CircularText');
const partnerCircularText = createRoot(container_CircularText);

partnerCircularText.render(
    <CircularText
        text="хакатон • цифровое студенчество КемГУ • "
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
    />
);

const container_cardKemSU = document.getElementById('cardKemSU');
const cardKemSU = createRoot(container_cardKemSU);

cardKemSU.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(125, 19, 155, 0.4)">
        <img className="KemSU_logo_partner" src={KemSUlogo} alt="KemSU logo"/>
        <div className="KemSUCard_title card_title">Кемеровский государственный университет</div>
        <div className="KemSUCard_text card_text">
            опорный ВУЗ Кузбасса, основанный в 1974 году<br/>
             <br/>
            включён в рейтинг лучших вузов развивающихся стран Европы и Средней Азии QS EECA — 2021<br/>
             <br/>
            по версии Европейской Научно-промышленной палаты (ARES), вуз попал в топ-100 университетов России
        </div>
        <div className="hrefs">
            <a className="internet_link" href="https://kemsu.ru"><img className="internet_link_img" src={Internetlogo}></img></a>
            <a className="vk_link" href="https://vk.com/kemsu_ru"><img className="vk_link_img" src={VKlogo}></img></a>
        </div>
    </SpotlightCard>
);

const container_cardUMPKemSU = document.getElementById('cardUMPKemSU');
const cardUMPKemSU = createRoot(container_cardUMPKemSU);

cardUMPKemSU.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 163, 234, 0.6)">
        <img className="UMPKemSU_logo_partner" src={UMPKemSUlogo} alt="UMPKemSU logo"/>
        <div className="UMPKemSUCard_title card_title">Управление молодежной политики КемГУ</div>
        <div className="UMPKemSUCard_text card_text">
            управление действует в целях создания благоприятных условий,
            обеспечивающих рост лидерских качеств студентов,
            всестороннего обеспечения реализации их прав на участие в развитии КемГУ и региона,
            поддержки и эффективного управления молодежными идеями и инициативами, развития социальной,
            общественной и научно-инновационной активности обучающихся
        </div>
        <div className="hrefs">
            <a className="internet_link" href="https://kemsu.ru/university/structure/unit/management-youth-policy/"><img className="internet_link_img" src={Internetlogo}></img></a>
            <a className="vk_link" href="https://vk.com/molodkemsu"><img className="vk_link_img" src={VKlogo}></img></a>
        </div>
    </SpotlightCard>
);

const container_balatro = document.getElementById('balatro');
const balatroBACK = createRoot(container_balatro);
import Balatro from './components/Balatro.jsx';

balatroBACK.render(
    <Balatro
    isRotate={false}
    mouseInteraction={false}
    pixelFilter={700}
    />
);














import PMHlogo from './pmh.png'

const container_card_DOP = document.getElementById('cardDOPone');
const cardDOP = createRoot(container_card_DOP);

cardDOP.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.05)">
        <img className="PMH_logo_partner" src={PMHlogo} alt="PMH logo"/>
        <div className="hrefs">
            <a className="internet_link" href="https://metholding.ru/"><img className="internet_link_img" src={Internetlogo}></img></a>
            <a className="vk_link" href="https://vk.com/metholdingru"><img className="vk_link_img" src={VKlogo}></img></a>
        </div>

    </SpotlightCard>
);

