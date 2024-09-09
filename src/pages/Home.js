import 'bootstrap/dist/css/bootstrap.min.css'; // src/App.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import CourseMaterials from './CourseMaterials';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in (example using localStorage)
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogout = () => {
        // Clear user data and localStorage
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">Арабский язык</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {user ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        здравствуйте, {user.name}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <button className="dropdown-item" onClick={handleLogout}>Выйти</button>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">вход</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">регистрировать</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            <div className="hero-image">
                <div className="hero-text">
                    <h1>Арабский язык для русскоговорящих</h1>
                    <p>Окунитесь в красоту арабского языка с помощью индивидуального обучения, которое устранит языковую пропасть для русскоязычных, обещая плавный переход от кириллицы к чарующему миру арабской письменности, открывая секреты базового общения, культурные нюансы и основы грамматики, которые помогут вам уверенно общаться на английском языке. Арабоязычный мир.</p>
                    <a href="/payment" className="btn btn-primary btn-lg">Купить Сейчас</a>
                </div>
            </div>
            <div className="intro-section">
                <div className="intro-container">
                    <div className="intro-image">
                        <img src={require('../writing.jpeg')} alt="Course Introduction"/>
                    </div>
                    <div className="intro-text">
                        <h2>Курс</h2>
                        <p>Давайте погрузимся в увлекательный мир арабского языка – одного из шести официальных языков ООН и ключа к богатой культуре Ближнего Востока. Этот курс разработан специально для русскоговорящих и начинается с азов: мы учим арабский алфавит, основные правила произношения и постепенно переходим к повседневному общению. Поскольку арабский язык полон нюансов и тонкостей, мы уделяем особое внимание грамматике и словарному запасу, чтобы вы могли выражать свои мысли четко и точно.</p>
                        <p>Обучение включает в себя не только традиционные уроки, но и интерактивные упражнения, которые помогут вам лучше понять и прочувствовать язык. К тому же, использование реальных диалогов и текстов скрасит процесс и предоставит практический опыт, применимый в туризме, деловых переговорах или при личных встречах с носителями языка. Изучение арабского откроет перед вами двери в новый мир, расширит ваш кругозор и предоставит возможности для международного общения и карьерного роста.</p>
                    </div>
                </div>
            </div>

            <div className="learn-section">
                <h2>Чему вы научитесь?</h2>
                <p>Когда я начинал разрабатывать этот курс, я имел в виду уникальное лингвистическое путешествие, в которое вы, как носитель русского языка, отправитесь. Изучение арабского языка открывает совершенно новый мир культурных ценностей и возможностей для бизнеса. Я тщательно подготовил каждый урок, опираясь на ваши знания кириллического алфавита, которые удивительным образом согласуются с логикой арабского языка. Мы будем продвигаться шаг за шагом, следя за тем, чтобы каждая концепция была четко понята и ее можно было применять на практике. Это больше, чем просто изучение языка; речь идет о том, чтобы открыть для себя богатую лингвистическую палитру в структурированном и удобоваримом виде. К концу курса вы не только усвоите основы, но и оцените нюансы, которые делают арабский язык красивым и полезным для изучения.</p>
            </div>
            <div id="courses" className="container">
                <CourseMaterials />
            </div>
            <div className="instructor-section mt-5">
                <div className="row">
                    <div className='instructor'>
                        <div className="instructor-photo col-lg-4 text-center">
                            <img src={require('../instractor_photo.jpeg')} alt="Instructor" className="img-fluid" style={{borderRadius:'10px'}} />
                        </div>
                        <div className="instructor-text col-lg-8">
                            <h2>Ваш инструктор</h2>
                            <p>Абдельмегид Абуэлайл стоит на перекрестке культурных обменов, привнося с собой глубокое понимание сложного ковра арабского языка, который он мастерски вплетает в ткань своего преподавания. Обладая многолетним опытом работы в области лингвистики и глубоко укоренившейся страстью к развитию общения между разными народами, Абдельмегид отточил свое мастерство квалифицированного педагога. Его приверженность языковому образованию подчеркивается его специализацией в адаптации богатого лексикона и сложной грамматики арабского языка к уникальной языковой среде коренных жителей России, устраняя разрыв между двумя различными культурами с помощью силы языка.

В основе философии преподавания Абдельмегида лежит подлинная связь с арабским языком, связь, которая выходит за рамки простого академического интереса к красоте языка и его культурному значению. Эта страсть ощутима в его интерактивном и динамичном стиле преподавания, который не только вовлекает его студентов, но и прививает им такое же понимание нюансов арабского языка. Его способность сопереживать лингвистическим трудностям, с которыми сталкиваются носители русского языка, создает благоприятную и обогащающую учебную среду, отражающую его личный вклад в продвижение каждого студента к овладению языком.</p>
                        </div>                  
                    </div>
                </div>
                <div className="row mt-5 text-center">
                <div className="col-md-2">
                    <img src={require('../essential.jpeg')} alt="Essential" className="img-fluid" style={{maxHeight:'300px', borderRadius:'10px'}} />
                    <h3>Существенный</h3>
                    <p style={{ paddingBottom:'1.5rem'}}>Базовый уровень владения арабским языком для русскоговорящих</p>
                </div>
                <div className="col-md-2">
                    <img src={require('../Comprehensive.jpeg')} alt="Comprehensive" className="img-fluid" style={{maxHeight:'300px', borderRadius:'10px'}} />
                    <h3>Всесторонний</h3>
                    <p>От простых выражений до сложных предложений для носителей русского языка</p>
                </div>
                <div className="col-md-2">
                    <img src={require('../Interactive.jpeg')} alt="Interactive" className="img-fluid" style={{maxHeight:'300px', borderRadius:'10px'}} />
                    <h3>Интерактивный</h3>
                    <p>Развитие навыков разговорной речи на арабском языке у русскоязычного сообщества</p>
                </div>
                </div>
        </div>    
        <div className="subscription-footer mt-5">
        <footer className="text-center mt-5">
          <p>© Школа арабского языка для русских 2024</p>
          <div>
            <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/terms" className="text-decoration-none">условия использования</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/privacy" className="text-decoration-none">политика конфиденциальности</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/ContactUs" className="text-decoration-none">связаться с нами</a>
          </div>
          <p>Teach Online with <a href="#" className="text-decoration-none"></a></p>
        </footer>
      </div>
    </div>
        
    );
}

export default Home;
