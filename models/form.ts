interface FormSignIn {
    username: string;
    password: string;
}

interface FormSignUp extends Pick<FormSignIn , 'password'> , Pick<User, 'username' | 'email'>{
    confirmPassword: string;
}