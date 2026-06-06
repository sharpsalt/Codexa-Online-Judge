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
 */