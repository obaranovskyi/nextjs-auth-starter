import LoginForm from "./form";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={`${styles.login} container d-flex justify-content-center align-items-center`}>
      <LoginForm />
    </div>
  );
}
