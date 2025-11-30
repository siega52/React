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
