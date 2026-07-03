
// Q1. Voting Eligibility Checker

let age = 20;

if (age >= 18) {
    console.log("Eligible to Vote");
} else {
    console.log("Not Eligible to Vote");
}


// Q2. ATM Withdrawal System

let balance = 1500;

if (balance >= 1000) {
    console.log("Withdrawal Allowed");
} else {
    console.log("Insufficient Balance");
}


// Q3. Temperature Checker

let temp = 30;

if (temp > 35) {
    console.log("Hot");
} else if (temp >= 20) {
    console.log("Pleasant");
} else {
    console.log("Cold");
}

// Q4. Grade Calculator

let marks = 85;

if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 75) {
    console.log("Grade B");
} else if (marks >= 60) {
    console.log("Grade C");
} else {
    console.log("Fail");
}

// Q5. Age Category Program

let personAge = 25;

if (personAge < 13) {
    console.log("Child");
} else if (personAge <= 19) {
    console.log("Teenager");
} else if (personAge <= 59) {
    console.log("Adult");
} else {
    console.log("Senior Citizen");
}

// Q6. Print Numbers 1 to 20

for (let i = 1; i <= 20; i++) {
    console.log(i);
}

// Q7. Print Even Numbers from 1 to 50

for (let i = 2; i <= 50; i += 2) {
    console.log(i);
}

// Q8. Print Odd Numbers from 1 to 50

for (let i = 1; i <= 50; i += 2) {
    console.log(i);
}

// Q9. Multiplication Table of 8

for (let i = 1; i <= 10; i++) {
    console.log("8 x " + i + " = " + (8 * i));
}

// Q10. Student Roll Number Generator

for (let i = 101; i <= 120; i++) {
    console.log("Student Roll No: " + i);
}

// Q11. Star Pattern

console.log("*****");


// Q12. Square Pattern

for (let i = 1; i <= 5; i++) {
    console.log("*****");
}


// Q13. Right Triangle

for (let i = 1; i <= 5; i++) {
    console.log("*".repeat(i));
}


// Q14. Reverse Triangle

for (let i = 5; i >= 1; i--) {
    console.log("*".repeat(i));
}


// Q15. Number Triangle

for (let i = 1; i <= 5; i++) {

    let row = "";

    for (let j = 1; j <= i; j++) {
        row += j;
    }

    console.log(row);
}

// Q16. Repeating Number Pattern

for (let i = 1; i <= 5; i++) {
    console.log(String(i).repeat(i));
}

// Q17. Pyramid Pattern

for (let i = 1; i <= 5; i++) {

    let spaces = " ".repeat(5 - i);
    let stars = "*".repeat(2 * i - 1);

    console.log(spaces + stars);
}

// Q18. Inverted Pyramid

for (let i = 5; i >= 1; i--) {

    let spaces = " ".repeat(5 - i);
    let stars = "*".repeat(2 * i - 1);

    console.log(spaces + stars);
}

// Q19. Login System

let isLoggedIn = true;

if (isLoggedIn) {
    console.log("Welcome User");
} else {
    console.log("Please Login");
}

// Q20. Online Shopping Discount

let cartValue = 5500;

if (cartValue > 5000) {
    console.log("20% Discount");
} else if (cartValue > 3000) {
    console.log("10% Discount");
} else {
    console.log("No Discount");
}

// Q21. Mobile Battery Alert

let battery = 15;

if (battery < 20) {
    console.log("Low Battery");
} else {
    console.log("Battery OK");
}

// Q22. Password Attempts

for (let i = 1; i <= 5; i++) {
    console.log("Attempt " + i);
}


// Q23. Diamond Pattern
// Upper Part

for (let i = 1; i <= 5; i++) {

    let spaces = " ".repeat(5 - i);
    let stars = "*".repeat(2 * i - 1);

    console.log(spaces + stars);
}

// Lower Part

for (let i = 4; i >= 1; i--) {

    let spaces = " ".repeat(5 - i);
    let stars = "*".repeat(2 * i - 1);

    console.log(spaces + stars);
}

// Q24. FizzBuzz Program 

for (let i = 1; i <= 30; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    }
    else if (i % 3 === 0) {
        console.log("Fizz");
    }
    else if (i % 5 === 0) {
        console.log("Buzz");
    }
    else {
        console.log(i);
    }

}