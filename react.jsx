import React from 'react';

//примеры кода на react


// const Card = () => {
//   return (
//     <div className="card">
//       <div className="card-body">
//         <h4 className="card-title">Card title</h4>
//         <p className="card-text">Some quick example text to build on the card</p>
//         <button type="button" className="btn btn-primary">Go somewhere</button>
//       </div>
//     </div>
//   );
// };

// export default Card;


//Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход объект со свойствами title и text, и возвращает jsx с подставленными значениями
const Card = ({title, text}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{text}</p>
        <button className="btn btn-primary">Go somewhere</button>
      </div>
    </div>
  );
};

export default Card;



// Реализуйте и экспортируйте по умолчанию компонент Definitions, который принимает свойство data следующей структуры:
// const definitions = [
//   { dt: 'one', dd: 'two' },
//   { dt: 'another term', dd: 'another description' },
// ];
// <Definitions data={definitions} />

const Definitions = ({data}) => {
  if (!data || data.length === 0) {
    return null;
  }
  
  return (
    <dl>
      {data.map((item, indext) => (
        <React.Fragment key = {index}>
          <dt>{item.dt}</dt>
          <dd>{item.dd}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

export default Definitions;



// Реализуйте компонент Progress, который принимает свойство percentage и рисует статический прогресс бар.
// Использование:
// <Progress percentage={40} />;

const Progress = ({percentage}) => {
  return (
    <div className="progress">
      <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" aria-label="progressbar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default Progress;



// Реализуйте компонент Alert, который отрисовывает алерт бутстрапа. Компонент принимает на вход два свойства:

// text - отображаемый текст
// type - тип алерта, может принимать одно из следующих значений: primary, secondary, success, danger, warning, info, light, dark;
// Пример использования:
// <Alert type="warning" text="what is love?" />;
// Вывод:
// <div class="alert alert-warning" role="alert">what is love?</div>

const Alert = ({type, text}) => {
  return (
    <div className={`alert alert-${type}`} role="alert">{text}</div>;
  );
};

export default Alert;



// Реализуйте компонент ListGroup, который отрисовывает переданных детей, оборачивая их в список.
// Пример использования:
// <ListGroup>
//   <p>one</p>
//   <p>two</p>
// </ListGroup>;
// Результат:
// <ul class="list-group">
//   <li class="list-group-item"><p>one</p></li>
//   <li class="list-group-item"><p>two</p></li>
// </ul>

const ListGroup = ({children}) => {
  return (
    <ul className="list-group">
      {React.Children.map(children, (child, index) => (
        <li key={index} className="list-group-item">
          {child}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;



// Реализуйте компонент BtnGroup, который отрисовывает две кнопки. Нажатие на любую из кнопок делает ее активной, а другую неактивной. При первой загрузке ни одна из кнопок не нажата.
// Пример использования:
// <BtnGroup />
// Результат:
// <div class="btn-group" role="group">
//   <button type="button" class="btn btn-secondary left">Left</button>
//   <button type="button" class="btn btn-secondary right">Right</button>
// </div>

const BtnGroup = () => {
  const [activeButton, setActiveButton] = useState(null);
  const handleClick = (buttonName) => {
    if (activeButton === buttonName){
      setActiveButton(null);
    }
    else{
      setActiveButton(buttonName);
    }
  }

  return (
    <div className="btn-group" role="group">
      <button type="button" className={`btn btn-secondary left ${activeButton === 'left' ? 'active' : ''}`} onClick={() => handleClick('left')}>Left</button>
      <button type="button" className={`btn btn-secondary right ${activeButton === 'right' ? 'active' : ''}`} onClick={() => handleClick('right')}>Right</button>
    </div>
  );
};

export default BtnGroup;



// Реализуйте компонент, эмулирующий работу слайдера. Компонент принимает на вход свойство images, в котором находится список путей до картинок. Компонент отображает их и позволяет с помощью стрелок "вперёд" и "назад" осуществлять переход по ним. Сам переход зациклен. Картинки (пути до них) могут повторятся.
// Ниже описано поведение:
// Если выбрана последняя картинка, то next ведёт на первую. То же самое происходит и prev, но в обратную сторону.
// Первая картинка становится активной. Порядок картинок и их отображение должны сохраняться.
// Начальная вёрстка с данными, которые прогружаются в файле src/index.jsx:

// <div id="carousel" class="carousel slide" data-ride="carousel">
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img alt="" class="d-block w-100" src="/images/first.jpeg">
//     </div>
//     <div class="carousel-item">
//       <img alt="" class="d-block w-100" src="/images/second.jpeg">
//     </div>
//     <div class="carousel-item">
//       <img alt="" class="d-block w-100" src="/images/third.jpeg">
//     </div>
//   </div>
//   <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
//     <span class="carousel-control-prev-icon"></span>
//     <span class="sr-only">Previous</span>
//   </a>
//   <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
//     <span class="carousel-control-next-icon"></span>
//     <span class="sr-only">Next</span>
//   </a>
// </div>

import React, { useState, useEffect } from 'react';

const Carousel = ({ images, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Автопрокрутка
  useEffect(() => {
    if (autoPlayInterval) {
      const intervalId = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(intervalId); // Очистка при размонтировании
    }
  }, [autoPlayInterval, images.length]);
  
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div id="carousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img 
              alt={`Slide ${index + 1}`} 
              className="d-block w-100" 
              src={image}
            />
          </div>
        ))}
      </div>
      
      <button 
        className="carousel-control-prev" 
        type="button"
        onClick={prevSlide}
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button 
        className="carousel-control-next" 
        type="button"
        onClick={nextSlide}
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
