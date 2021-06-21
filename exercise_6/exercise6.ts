/*

Intro:

    Filtering requirements have grown. We need to be
    able to filter any kind of Persons.

Exercise:

    Fix typing for the filterPersons so that it can filter users
    and return User[] when personType='user' and return Admin[]
    when personType='admin'. Also filterPersons should accept
    partial User/Admin type according to the personType.
    `criteria` argument should behave according to the
    `personType` argument value. `type` field is not allowed in
    the `criteria` field.

Higher difficulty bonus exercise:

    Implement a function `getObjectKeys()` which returns more
    convenient result for any argument given, so that you don't
    need to cast it.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

*/

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

export function filterPersons(persons: Person[], personType: string, criteria: Partial<Person>): User[];

export function filterPersons(persons: Person[], personType: string, criteria: Partial<Person>): Admin[];

export function filterPersons(persons: Person[], personType: string, criteria: Partial<Person>): Person[] {
    let myPersons = persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });

        // Some debug here to make sure that the type I expect is being returned, it seems to be working
        if (personType == 'user') {
            console.log('returning user array');
            return myPersons as User[];
        } else if (personType == 'admin') {
            console.log('returning admin array');
            return myPersons as Admin[];
        }
        return myPersons;
}


export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);


// Check if my updated filterPersons can take an array of User or Admin as well...
// This seems to work as expected!

export const dialUsers: User[] = [
    { type: 'user', name: 'Chris Dial', age: 41, occupation: 'Engineer' },
    { type: 'user', name: 'Alex Dial', age: 39, occupation: 'Circus Performer' },
];

export const dialAdmins: Admin[] = [
    { type: 'admin', name: 'Traci Dial', age: 36, role: 'Mother' },
    { type: 'admin', name: 'Nick Dial', age: 39, role: 'EMT' },
];


export const dialUsersOfAge39 = filterPersons(dialUsers, 'user', { age: 39 });
export const dialAdminsOfAge39 = filterPersons(dialAdmins, 'admin', { age: 39 });

console.log('DialUsers of age 39:');
dialUsersOfAge39.forEach(logPerson);

console.log('DialAdmins of age 39:');
dialAdminsOfAge39.forEach(logPerson);



// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
