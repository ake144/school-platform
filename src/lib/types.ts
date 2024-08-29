export interface StudentSchema {
    studentId: string;      // Unique identifier specific to the student
    name: string;           // Student's full name
    email: string;          // Email address of the student
    phone?: string;         // Optional phone number
    address?: string;       // Optional address information
    photo?: string;         // URL to the student's photo
    grade: number;          // Grade level of the student (number type since it's 'Int' in Prisma)
    classId: string;        // The ID of the class the student is associated with
    parentId?: string;      // The ID of the parent associated with the student
    userId: string;         // ID linking to the User model
  }


  export interface UserSchema {
    
    name: string;           // User's full name
    email: string;          // Email address of the user
    role: string;           // Role of the user (Student, Teacher, Admin, Parent)
    address?: string;
    phone?:string;
    photo?:string;
    clerkUserId?:string;


  }
  