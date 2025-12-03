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



// Реализуйте компонент <Collapse>, который по клику на ссылке отображает свое содержимое и при повторном - прячет. Содержимое передается в компонент через свойство text. За начальное состояние открытости, отвечает свойство opened, которое по умолчанию равно true.

// const text = 'collapse me';
// <Collapse text={text} opened={false} />;
// <div>
//   <p>
//     <a class="btn btn-primary" href="#">Link with href</a>
//   </p>
//   <div class="collapse">
//     <div class="card card-body">
//       collapse me
//     </div>
//   </div>
// </div>

const Collapse = ({text, opened = true}) => {
  const [isOpen, setIsOpen] = useState(opened);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <p>
        <a href="#" className="btn btn-primary" onClick={(e) => {e.preventDefault(); toggleCollapse();}}>Link with href</a>
      </p>
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <div className="card card-body">{text}</div>
      </div>
    </div>
  );
};

export default Collapse;



// Реализуйте компонент <MyForm> отображающий форму из шести элементов:
// email - инпут типа email
// password - инпут типа password
// address - textarea
// city - текстовый инпут
// country - select со следующими значениями: argentina, russia, china.
// Accept Rules - checkbox
// После сабмита формы, появляется таблица в которой показываются значения всех полей. Из этой формы можно вернуться в редактирование по кнопке Back. При этом все данные должны оказаться на своих местах.

// Форма
// <form name="myForm">
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="email" class="col-form-label">Email</label>
//       <input type="email" name="email" class="form-control" id="email" placeholder="Email">
//     </div>
//     <div class="form-group col-md-6">
//       <label for="password" class="col-form-label">Password</label>
//       <input type="password" name="password" class="form-control" id="password" placeholder="Password">
//     </div>
//   </div>
//   <div class="form-group">
//     <label for="address" class="col-form-label">Address</label>
//     <textarea type="text" class="form-control" name="address" id="address" placeholder="1234 Main St"></textarea>
//   </div>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="city" class="col-form-label">City</label>
//       <input type="text" class="form-control" name="city" id="city">
//     </div>
//     <div class="form-group col-md-6">
//       <label for="country" class="col-form-label">Country</label>
//       <select id="country" name="country" class="form-control">
//         <option>Choose</option>
//         <option value="argentina">Argentina</option>
//         <option value="russia">Russia</option>
//         <option value="china">China</option>
//       </select>
//     </div>
//   </div>
//   <div class="form-group">
//     <div class="form-check">
//       <label class="form-check-label" for="rules">
//         <input id="rules" type="checkbox" name="acceptRules" class="form-check-input">
//         Accept Rules
//       </label>
//     </div>
//   </div>
//   <button type="submit" class="btn btn-primary">Sign in</button>
// </form>
// После отправки формы:

// <div>
//   <button type="button" class="btn btn-primary">Back</button>
//   <table class="table">
//     <tbody>
//       <tr>
//         <td>acceptRules</td>
//         <td>true</td>
//       </tr>
//       <tr>
//         <td>address</td>
//         <td>lenina street</td>
//       </tr>
//       <tr>
//         <td>city</td>
//         <td>moscow</td>
//       </tr>
//       <tr>
//         <td>country</td>
//         <td>russia</td>
//       </tr>
//       <tr>
//         <td>email</td>
//         <td>my@email.com</td>
//       </tr>
//       <tr>
//         <td>password</td>
//         <td>qwerty</td>
//       </tr>
//     </tbody>
//   </table>
// </div>
// Строки сортируются в алфавитном порядке по именам в первом столбце. В вашем случае результирующая таблица может отличаться, все зависит от того какие данные выбраны.

const MyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '',
    city: '',
    country: '',
    acceptRules: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBack = () => {
    setIsSubmittedt(false);
  };

  if (isSubmitted) {
    const dataEntries = Object.entries(formData);
    const sortedEntries = dataEntries.sort(([keyA], [keyB]) => 
      keyA.localeCompare(keyB)
    );
    
    return (
      <div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={handleBack}
        >
          Back
        </button>
        <table className="table">
          <tbody>
            {sortedEntries.map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  // Если форма не отправлена, показываем форму
  return (
    <form name="myForm" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="email" className="col-form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            id="email" 
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="password" className="col-form-label">Password</label>
          <input 
            type="password" 
            name="password" 
            className="form-control" 
            id="password" 
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="address" className="col-form-label">Address</label>
        <textarea 
          className="form-control" 
          name="address" 
          id="address" 
          placeholder="1234 Main St"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="city" className="col-form-label">City</label>
          <input 
            type="text" 
            className="form-control" 
            name="city" 
            id="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="country" className="col-form-label">Country</label>
          <select 
            id="country" 
            name="country" 
            className="form-control"
            value={formData.country}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose</option>
            <option value="argentina">Argentina</option>
            <option value="russia">Russia</option>
            <option value="china">China</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <div className="form-check">
          <label className="form-check-label" htmlFor="rules">
            <input 
              id="rules" 
              type="checkbox" 
              name="acceptRules" 
              className="form-check-input"
              checked={formData.acceptRules}
              onChange={handleInputChange}
              required
            />
            Accept Rules
          </label>
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
  );
};

export default MyForm;



// Реализуйте компонент, который представляет собой две кнопки и лог событий:
// Лог — это список значений, каждое из которых получается после нажатия на одну из двух кнопок. Снизу находятся более старые события, сверху новые.
// Левая кнопка + добавляет в лог строчку с новым значением равным: значение "самой новой существующей записи лога" + 1
// Правая кнопка - добавляет в лог строчку с новым значением равным: значение "самой новой существующей записи лога" - 1
// При клике на запись в логе, она удаляется.

// Начальный HTML:
// <div>
//   <div class="btn-group" role="group">
//     <button type="button" class="btn hexlet-inc">+</button>
//     <button type="button" class="btn hexlet-dec">-</button>
//   </div>
// </div>
// После нажатия последовательности +, +, -, +:

// <div>
//   <div class="btn-group" role="group">
//     <button type="button" class="btn hexlet-inc">+</button>
//     <button type="button" class="btn hexlet-dec">-</button>
//   </div>
//   <div class="list-group">
//     <button type="button" class="list-group-item list-group-item-action">2</button>
//     <button type="button" class="list-group-item list-group-item-action">1</button>
//     <button type="button" class="list-group-item list-group-item-action">2</button>
//     <button type="button" class="list-group-item list-group-item-action">1</button>
//   </div>
// </div>

import React, { useState } from 'react';

const CounterLog = () => {
  // Состояние для хранения лога значений
  const [log, setLog] = useState([]);
  
  // Функция для добавления нового значения в лог
  const addToLog = (increment) => {
    // Получаем последнее (самое новое) значение из лога
    const lastValue = log.length > 0 ? log[0] : 0;
    
    // Вычисляем новое значение
    const newValue = lastValue + increment;
    
    // Добавляем новое значение в начало массива (сверху)
    setLog([newValue, ...log]);
  };
  
  // Функция для удаления элемента из лога
  const removeFromLog = (index) => {
    // Создаем новый массив без элемента по указанному индексу
    const newLog = [...log];
    newLog.splice(index, 1);
    setLog(newLog);
  };
  
  // Обработчики кликов по кнопкам
  const handleIncrement = () => {
    addToLog(1);
  };
  
  const handleDecrement = () => {
    addToLog(-1);
  };
  
  return (
    <div>
      <div className="btn-group" role="group">
        <button 
          type="button" 
          className="btn hexlet-inc"
          onClick={handleIncrement}
        >
          +
        </button>
        <button 
          type="button" 
          className="btn hexlet-dec"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
      
      {/* Отображаем лог, если есть записи */}
      {log.length > 0 && (
        <div className="list-group">
          {log.map((value, index) => (
            <button
              key={index}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => removeFromLog(index)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CounterLog;



// Реализуйте простой Todo, с возможностью добавлять и удалять заметки.
// Основной компонент, который выводит форму для добавления новой записи и выводит список заметок на экран.
// Начальный HTML:

// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
// </div>
// src/Item.jsx
// Отрисовывает конкретный элемент списка. Принимает на вход свойства:

// task
// onRemove
// HTML с добавленными заметками:

// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
//   <div>
//     <div class="row">
//       <div>
//         <button type="button" class="btn btn-primary btn-sm">-</button>
//       </div>
//       <div class="col-10">second</div>
//     </div>
//     <hr>
//   </div>
//   <div>
//     <div class="row">
//       <div>
//         <button type="button" class="btn btn-primary btn-sm">-</button>
//       </div>
//       <div class="col-10">first</div>
//     </div>
//     <hr>
//   </div>
// </div>
// Добавление элементов происходит в обратном порядке. Новые всегда сверху.

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import Item from './Item.jsx';

const ToDoBox = () => {
  // Состояние для хранения списка задач
  const [tasks, setTasks] = useState([]);

  // Состояние для значения input
  const [inputValue, setInputValue] = useState('');

  // Обработчик изменения input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return; // Не добавляем пустые задачки
    }

    // Создаем новую задачу с уникальным id
    const newTask = {
      id: uniqueId(),
      text: inputValue.trim()
    };

    // Добавляем новую задачу в начало массива
    setTasks([newTask, ...tasks]);

    // Очищаем input
    setInputValue('');
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <div className="mb-3">
        <form action="" className="todo-form form-inline mx-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control mr-3" value={inputValue} onChange={handleInputChange} required placeholder="I am going..."/>
          </div>
          <button className="btn btn-primary" type="submit">add</button>
        </form>
      </div>
      {/* рендер списка задач */}
      {tasks.map(task => (
        <Item key={task.id} task={task.text} onRemove={() => handleRemoveTask(task.id)} />
      ))}
    </div>
  );
};

export default ToDoBox;



// Реализуйте компонент <Card> так чтобы можно составлять такую структуру:
// <Card>
//   <Card.Body>
//     <Card.Title>Title</Card.Title>
//     <Card.Text>Text</Card.Text>
//   </Card.Body>
// </Card>
// Получившийся HTML:
// <div class="card">
//   <div class="card-body">
//     <h4 class="card-title">Title</h4>
//     <p class="card-text">Text</p>
//   </div>
// </div>

const Card = ({children}) => {
  return (
    <div className="card">{children}</div>
  );
}

Card.Body = ({children}) => {
  return (
    <div className="card-body">{children}</div>
  );
};

Card.Tittle = ({children}) => {
  return (
    <h4 className="card-tittle">{children}</h4>
  );
};

Card.Text = ({children}) => {
  return (
    <p className="card-text">{children}</p>
  );
};

export default Card;



// Реализуйте компонент <Modal> (Модальное окно)
// Использование:
// export default class Component extends React.Component {
//   state = { modal: false };
//   toggle = (e) => {
//     e.preventDefault();
 
//     this.setState({
//       modal: !this.state.modal,
//     });
//   }
//   render() {
//     return (
//       <div>
//         <button type="button" className="modal-open-button btn btn-danger" onClick={this.toggle}>Open</button>
//         <Modal isOpen={this.state.modal}>
//           <Modal.Header toggle={this.toggle}>Modal title</Modal.Header>
//           <Modal.Body>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit
//           </Modal.Body>
//           <Modal.Footer>
//             <button type="button" className="modal-close-button btn btn-default" onClick={this.toggle}>Cancel</button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// HTML закрытого состояния:
// <div>
//   <button type="button" class="modal-open-button btn btn-danger">Open</button>
//   <div class="modal" style="display: none;" role="dialog">
//     <div class="modal-dialog">
//       <div class="modal-content">
//         <div class="modal-header">
//           <div class="modal-title">Modal title</div>
//           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">×</span>
//           </button>
//         </div>
//         <p class="modal-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
//         <p class="modal-footer">
//           <button type="button" class="modal-close-button btn btn-default">Cancel</button>
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// В открытом состоянии строчка: <div class="modal" style="display: none;"> заменяется на <div class="modal fade show" style="display: block;">
// У открытого модального окна две кнопки закрывающие его: крестик справа вверху и кнопка Cancel справа внизу.

import React, { useEffect } from 'react';

const Modal = ({ isOpen, children }) => {
  // Блокируем скролл body когда модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Очищаем при размонтировании
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Если модалка закрыта - не рендерим или рендерим с display: none
  if (!isOpen) {
    return (
      <div className="modal" style={{ display: 'none' }} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Если модалка открыта - рендерим с классами show
  return (
    <div className="modal fade show" style={{ display: 'block' }} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// Компонент заголовка модалки
Modal.Header = ({ toggle, children }) => {
  return (
    <div className="modal-header">
      <div className="modal-title">{children}</div>
      <button
        type="button"
        className="close"
        onClick={toggle}
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
};

// Компонент тела модалки
Modal.Body = ({ children }) => {
  return <p className="modal-body">{children}</p>;
};

// Компонент футера модалки
Modal.Footer = ({ children }) => {
  return <p className="modal-footer">{children}</p>;
};

export default Modal;
