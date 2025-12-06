// Примитивы
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Массивы
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Объекты
let user: { name: string; age: number } = { 
  name: "John", 
  age: 30 
};

// Функции
const add = (a: number, b: number): number => {
  return a + b;
};


// 1. Interface (чаще используется)
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean; // ? = необязательный проп
  size?: 'small' | 'medium' | 'large'; // union тип
}

// 2. Type alias
type ButtonProps = {
  text: string;
  onClick: () => void;
};

// Использование в компоненте
const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
  return <button onClick={onClick} disabled={disabled}>{text}</button>;
};
