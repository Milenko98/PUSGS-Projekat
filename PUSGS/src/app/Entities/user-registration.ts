export class UserRegistration {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    picture: string;
    dateofbirth: Date;
    location: string;

    public UserRegistration(){}

    public UserParameter(id = 0, username: string, firstname: string, lastname: string, email: string, password: string, role: string, picture: string, dateofbirth: Date, location: string){
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.picture = picture;
        this.dateofbirth = dateofbirth;
        this.location = location;
    }
}
