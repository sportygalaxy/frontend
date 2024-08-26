import RegistrationForm from "./components/RegisterationForm";

interface RegisterProps {}
export default function Register(props: RegisterProps) {
  return (
    <div className="wrapper">
      <RegistrationForm />
    </div>
  );
}
