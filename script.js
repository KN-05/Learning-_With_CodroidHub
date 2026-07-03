// Task 1 : External JavaScript

console.log("External JavaScript is Working!");


// Task 2 : Data Types Practice

let number = 100;
let name = "Aman";
let isStudent = true;
let data;
let value = null;
let bigNumber = 123456789123456789n;
let uniqueId = Symbol("id");

console.log("Number:", number);
console.log("String:", name);
console.log("Boolean:", isStudent);
console.log("Undefined:", data);
console.log("Null:", value);
console.log("BigInt:", bigNumber);
console.log("Symbol:", uniqueId);


// Task 3 : Student Information

let studentName = "Khush";
let age = 20;
let course = "B.Tech AI & ML";
let city = "Mathura";

console.log("Student Name:", studentName);
console.log("Age:", age);
console.log("Course:", course);
console.log("City:", city);


// Task 4 : Employee Object

let employee = {
    name: "Rahul",
    department: "IT",
    salary: 50000,
    experience: 3
};

console.log(employee);
console.log(employee.name);
console.log(employee.salary);

employee.salary = 60000;

console.log(employee);


// Task 5 : Mobile Object

let mobile = {
    brand: "Samsung",
    model: "S24",
    price: 75000,
    color: "Black"
};

console.log(mobile);

mobile.price = 70000;

console.log(mobile);


// Task 6 : Array Practice

let fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes"
];

console.log("First Fruit:", fruits[0]);
console.log("Last Fruit:", fruits[fruits.length - 1]);

fruits.push("Pineapple");
fruits.push("Kiwi");

console.log("Length:", fruits.length);
console.log(fruits);


// Task 7 : Student Array

let subjects = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "NodeJS"
];

console.log(subjects[0]);
console.log(subjects[2]);

subjects.push("MongoDB");

console.log(subjects.length);
console.log(subjects);


// Task 8 : Arithmetic Operators

let a = 20;
let b = 5;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);
console.log("Exponent:", a ** b);


// Task 9 : Salary Calculator

let basicSalary = 25000;
let bonus = 5000;

let totalSalary = basicSalary + bonus;

console.log("Total Salary:", totalSalary);


// Task 10 : Assignment Operators

let marks = 50;

marks += 10;
console.log(marks);

marks -= 5;
console.log(marks);

marks *= 2;
console.log(marks);

marks /= 5;
console.log(marks);

marks %= 3;
console.log(marks);


// Task 11 : Comparison Operators

let x = 10;
let y = 20;

console.log(x > y);
console.log(x < y);
console.log(x == y);
console.log(x != y);
console.log(x === y);
console.log(x !== y);


// Task 12 : Logical Operators

let personAge = 22;

console.log(personAge > 18 && personAge < 30);
console.log(personAge > 25 || personAge < 30);
console.log(!(personAge > 18));


// Task 13 : Increment & Decrement

let count = 10;

count++;
console.log(count);

count++;
console.log(count);

count--;
console.log(count);


// Challenge 1 : Product Object

let product = {
    productName: "Laptop",
    price: 65000,
    category: "Electronics",
    rating: 4.8
};

console.log(product);

product.price = 60000;

console.log(product);


// Challenge 2 : Cities Array

let cities = [
    "Delhi",
    "Mumbai",
    "Mathura",
    "Lucknow",
    "Agra",
    "Jaipur",
    "Chandigarh",
    "Pune",
    "Bhopal",
    "Noida"
];

console.log(cities[0]);
console.log(cities[cities.length - 1]);

cities.push("Indore");

console.log(cities.length);

console.log(cities);


// Challenge 3 : Student Profile

let profileName = "Khush";
let profileAge = 20;
let profileCourse = "B.Tech AI & ML";

let profile = {
    name: profileName,
    age: profileAge,
    course: profileCourse,
    college: "GLA University"
};

let hobbies = [
    "Coding",
    "Gaming",
    "Reading"
];

console.log(profileName);
console.log(profileAge);
console.log(profileCourse);

console.log(profile);

console.log(hobbies);


// Mini Project : Student Profile Dashboard

let stuName = "Khush";
let stuAge = 20;
let stuCourse = "B.Tech AI & ML";

let student = {
    name: stuName,
    age: stuAge,
    course: stuCourse,
    university: "GLA University"
};

let skills = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log("----- Student Dashboard -----");

console.log(student);

console.log(skills);

skills.push("React");
skills.push("NodeJS");

console.log("Updated Skills:");

console.log(skills);