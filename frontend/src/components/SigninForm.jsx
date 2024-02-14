import "./SigninForm.css";

export default function SigninForm({setUser, setMessage, message }) {

    async function handleSubmit(e) {
        e.preventDefault();
        const url = e.nativeEvent.submitter.value;
        const data = new FormData(e.target);
        const res = await fetch(`http://localhost:3000/${url}`, {
            method: "post",
            body: data,
            credentials: 'include',
            });
        const {username, score, message} = await res.json();
        setUser(username != null ? {username, score} : null);
        setMessage(message);
    }

    return(
        <>
            <form className="signin" onSubmit={handleSubmit}>
                        <input className="signin" type="text" name="username" placeholder="username" required></input>
                        <input className="signin" type="text" name="password" placeholder="password" required></input>
                        <button className="signin" type="submit" name="action" value="login">Login</button>
                        <button className="signin" type="submit" name="action2" value="signup">Signup</button>
            </form>
            {message && <h1 id="message">{message}</h1>}
        </>
    );
}