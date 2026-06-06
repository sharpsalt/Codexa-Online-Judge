import { z } from "zod";
//zod ek typescript validation library hai, jisme z is the main object provided by zod
//humlog iski help se schema banate hai and validate krte hai

/**
 * agar hum likhe 
 * const schema=z.string();
 * 
 * means "I expect a string hoga"
 */

// export interface CreateSubmissionDto {
//     userId: string,
//     problemId: string,
//     code: string,
//     language: string
// }; we don't simply go by this normal one because dekho yaha pe Typescript checks types only at compile time 

/**
 * suppose an api recieves 
 * {
 *   "userid":123
 * }
 * Typescript cannot stop this at runtime
 * so after compilation interface disappears completely
 * so we need runtime validation
 * that's why hum yaha pe zod use krrhe hai, it is pretty good standard to use it tho
 */

export type CreateSubmissionDto = z.infer<typeof createSubmissionZodSchema>;

export const createSubmissionZodSchema = z.object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
}).strict();

/**
 * DTO stands for Data Transfer Object.it's a simple object/class
 * whose job is to transfer data between different layers or services of an application.
 * 
 * and for example,syppose tumhare pass ek user table hai 
 * class User{
 *    Long id;
 *    String username;
 *    String password;
 *    String email;
 *    LocalDateTime createdAt;
 * }
 *  and you don't want to send the password to the frontend, so uske liye hum DTO create karenge 
 * 
 * class UserDTO{
 *    Long id;
 *    Strng username;
 *    String email;
 * }
 * 
 * Then:
 * 
 * User user = userRepository.findById(id);
UserDTO dto = new UserDTO(
    user.getId(),
    user.getUsername(),
    user.getEmail()
);

Simply return DTO instead of fully entity


Why DTO's?

1)Security: Like ye Hide karta hai sensitive fields ko so it should not be exposed in API response
   eg:
      password,secretKey,internalNotes

2)Reduce Data Transfer: Instead of sending

{
  "id": 1,
  "username": "srijan",
  "password": "...",
  "createdAt": "...",
  "updatedAt": "...",
  "roles": [...]
}
  send:

{
  "id": 1,
  "username": "srijan"
}
  less Network traffic bhi hoga isse...


3) Decouple API from Database
 
   Database schema may change:

   Your API Contract remains:
       userEntity->userDTO

    so frontend won't break 

Common Types
Request DTO

Data coming from client → server

class CreateUserRequest {
    String username;
    String email;
    String password;
}
Response DTO

Data going from server → client

class UserResponse {
    Long id;
    String username;
    String email;
}


If asked:
Why DTO instead of returning Entity?

Answer:
Hide sensitive fields
Reduce payload size
Separate API layer from persistence layer
Prevent accidental exposure of database structure
Easier validation and versioning
 */